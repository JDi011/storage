"use server";

import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();
    console.log("Database ID:", appwriteConfig.databaseId);
    console.log("User Collection ID:", appwriteConfig.userCollectionId);
    const result = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("email", [email])]
    );
    return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message:string) => {
    console.error(error, message);
    throw error;
}

const sendEmailOTP = async ({ email }: { email: string }) => {
    const { account } = await createAdminClient();
    try{
        const session = await account.createEmailToken(ID.unique(), email)
        return session.userId;
    }catch(error){
        handleError(error, "Failed to send email OTP");
    }
};

export const createAccount = async ({ 
    fullName, email 
}: { 
    fullName: string; email: string 
}) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email});
    if(!accountId) throw new Error("Failed to sernd an OTP");

    if(!existingUser){
        const { databases } = await createAdminClient();
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                fullName,
                avatar: "/assets/icons/avatar.jpg",
                accountId,
            }
        );
    } 

    return parseStringify({ accountId });
};