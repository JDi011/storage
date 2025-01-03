"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import { get } from "http";
import Thumbnail from "./ui/Thumbnail";

interface Props {
  owenerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ owenerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: FIle[]) => {
    setFiles(acceptedFiles);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn("uploader-button", className)}>
        <Image
          src='/assets/icons/upload.svg'
          alt='uploader'
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const {type, extension} = getFileType(file.name);
            return(
              <li key={`${file.name}-${index}`} className='uploader-preview-item'>
                <div className="flex items-center gap-3">
                  <Thumbnail 
                  type={type}
                  extension={extension}
                  url={convertFileToUrl(file)}
                  />
                  <div>
                    
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
