"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggler from './ui/theme-toggler'

const Navbar = () => {
    const navItems= [
        { label: "Dashboard", link: "/"},
        { label: "Issue", link: "/issues"}
    ]

    const pathName= usePathname()

    return (
        <nav className='flex space-x-6 justify-between border-b p-5 border-b-gray-500'>
            {/* logo */}
            <Link className='font-bold' href="/">🪲 Issue <span className='text-green-500'>Manager</span></Link>

            {/* nav items */}
            <ul className='flex space-x-6'>
                <ThemeToggler/>
                {navItems.map((item)=> {
                    return <Link 
                        className={`${item.link===pathName ? 'font-bold underline underline-offset-4': ''}  hover:scale-110 transition-all `} 
                        href={item.link} 
                        key={item.label}>{item.label}</Link>
                })}
            </ul>
        </nav>
    )
}

export default Navbar
