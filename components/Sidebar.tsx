import { Link } from "lucide-react";
import React from "react";
import Image from "next/image";


const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <Link href='/'>
        <Image src="/assets/icons/logo-full-brand.svg" alt="logo" width={160} height={50} className="w-6"/>
      </Link>
    </aside>
  );
};

export default Sidebar;