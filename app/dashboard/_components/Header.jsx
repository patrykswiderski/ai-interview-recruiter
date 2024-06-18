'use client'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

const Header = () => {
  const cssListClass =
    'hover:text-primary hover:font-bold transition-all cursor-pointer'
  const path = usePathname()
  const { isSignedIn } = useUser()
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  const handleCloseNav = (event) => {
    if (event.key === 'Escape' || (nav && !event.target.closest('.nav-menu'))) {
      setNav(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleCloseNav)
    document.addEventListener('click', handleCloseNav)

    return () => {
      document.removeEventListener('keydown', handleCloseNav)
      document.removeEventListener('click', handleCloseNav)
    }
  }, [nav])

  const cssClass =
    'p-2 transform transition-transform hover:bg-primary-color hover:text-black rounded-xl'

  return (
    <div className="flex p-4 justify-between bg-secondary shadow-sm">
      <Link href={'/'}>
        <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
      </Link>
      <ul className="hidden md:flex items-center gap-6 ">
        <li
          className={`${cssListClass} ${path == '/dashboard' && 'text-primary font-bold'}`}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/question' && 'text-primary font-bold'}`}
        >
          <Link href="#">Questions</Link>
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}
        >
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        <li
          className={`${cssListClass} ${path == '/dashboard/how' && 'text-primary font-bold'}`}
        >
          <Link href="/dashboard/how">How it Works</Link>
        </li>
      </ul>
      <div className="flex items-center">
        <div onClick={handleNav} className="block md:hidden mr-4">
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>

        {isSignedIn ? (
          <UserButton />
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>

      <div
        className={`nav-menu ${
          nav
            ? 'z-40 fixed h-full left-0 top-0 w-[70%] bg-gray-200 ease-in-out duration-500'
            : 'fixed left-[-100%]'
        }`}
      >
        <Link href={'/'}>
          <Image
            src={'/logo.svg'}
            width={180}
            height={120}
            alt="logo"
            className="p-2"
          />
        </Link>
        <ul className="p-2 text-xl sm:text-2xl font-semibold text-gray-700">
          <li className={cssClass} onClick={handleNav}>
            <a href="/dashboard" onClick={(e) => handleCloseNav(e)}>
              Dashboard
            </a>
          </li>
          <li className={cssClass} onClick={handleNav}>
            <a href="#" onClick={(e) => handleCloseNav(e)}>
              Questions
            </a>
          </li>
          <li className={cssClass} onClick={handleNav}>
            <a href="/dashboard/upgrade" onClick={(e) => handleCloseNav(e)}>
              Upgrade
            </a>
          </li>
          <li className={cssClass} onClick={handleNav}>
            <a href="/dashboard/how" onClick={(e) => handleCloseNav(e)}>
              How it Works
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
