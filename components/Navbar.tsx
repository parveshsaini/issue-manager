"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

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
                {navItems.map((item)=> {
                    return <Link 
                        className={`${item.link===pathName ? 'text-gray-900 font-bold': 'text-gray-700'} hover:text-gray-400 transition-colors`} 
                        href={item.link} 
                        key={item.label}>{item.label}</Link>
                })}
            </ul>
        </nav>
    )
}

export default Navbar
