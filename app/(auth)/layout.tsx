import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex">
        <div className="flex flex-col max-h-[800px] max-w-[430px] justify-center space-y-12">
          <Image
            className='logo'
            src='/assets/icons/logo-full.svg'
            alt='logo'
            width={224}
            height={82}
          />
          <div className='space-y-5 text-white'>
            <h1 className='h1'>Manage your files App</h1>
            <p className='body-1'>
              This is the place where you can store all your documents{" "}
            </p>
          </div>
          <Image 
            alt="illustration"
            src={'/assets/images/files.png'}
            className="transition-all hover:rotate-2 hover:scale-105 cursor-pointer"
            width={350}
            height={350}
          />
        </div>
      </section>

      <section className="lg:py-0 lg:p-10 p-4 py-10 flex flex-1 flex-col items-center bg-white justify-center">
        <div className="mb-16 lg:hidden">
            <Image
            alt="logo"
            src="/assets/icons/logo-full-brand.svg"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
            />
        </div>
        {children}    
      </section>
      </div>
  );
};

export default Layout;
