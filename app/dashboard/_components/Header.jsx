'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
  const cssListClass =
    'hover:text-primary hover:font-bold transition-all cursor-pointer'
  const path = usePathname()

  // useEffect(()=>{
  //   console.log(path);
  // },[])

  return (
    <div className="flex p-4 justify-between bg-secondary shadow-sm">
      <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      <ul className="hidden lg:flex items-center gap-6 ">
        <li
          className={`${cssListClass} ${path == '/dashboard' && 'text-primary font-bold'}`}
        >
          Dashboard
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/question' && 'text-primary font-bold'}`}
        >
          Questions
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}
        >
          Upgrade
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/how' && 'text-primary font-bold'}`}
        >
          How it Works
        </li>
      </ul>
      <UserButton />
    </div>
  )
}

export default Header
