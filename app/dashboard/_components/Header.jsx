"use client"
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React,{useEffect} from 'react';
import {usePathname } from 'next/navigation';
function Header() {
  const path = usePathname();
  useEffect(()=>{
      console.log(path)
  },[])
  return (
    <div className="flex  p-4 item-center justify-between bg-secondary shadow-sm">
      {/* Logo */}
      <Image src="/logo.svg" width={40} height={40} alt="logo" />

      {/* Menu */}
      <ul className="hidden md:flex gap-6 font-medium">
    <li
  className={`hover:text-primary hover:font-bold transition cursor-pointer ${path === '/dashboard '&&'text-primary font-bold'}`}>Dashboard</li>
    <li
  className={`hover:text-primary hover:font-bold transition cursor-pointer ${path === '/dashboard/questions '&&' text-primary font-bold'}`}>Questions</li>
    <li
  className={`hover:text-primary hover:font-bold transition cursor-pointer ${path === '/dashboard/upgrade '&&' text-primary font-bold' }`}>Upgrade</li>
    <li
  className={`hover:text-primary hover:font-bold transition cursor-pointer ${path === '/dashboard/how it works '&&' text-primary font-bold' }`}>How it Works?</li>
    </ul>

      {/* User Icon */}
      <UserButton />
    </div>
  );
}

export default Header;
