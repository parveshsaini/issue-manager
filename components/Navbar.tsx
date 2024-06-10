"use client"

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import ThemeToggler from './ui/theme-toggler'
import {useSession} from "next-auth/react"
import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Navbar = () => {
    const navItems= [
        { label: "Dashboard", link: "/"},
        { label: "Issue", link: "/issues"}
    ]

    const pathName= usePathname()
    const { status, data: session} = useSession()

    return (
        <nav className='flex space-x-6 justify-between items-center border-b p-5 border-b-gray-500'>
            {/* logo */}
            <Link className='font-bold text-4xl' href="/">🪲 Issue <span className='text-green-500'>Manager</span></Link>

            {/* nav items */}
            <ul className='flex space-x-6'>
                
                {navItems.map((item)=> {
                    return <Link 
                        className={`${item.link===pathName ? 'font-bold underline underline-offset-4': ''}  hover:scale-110 transition-all `} 
                        href={item.link} 
                        key={item.label}>{item.label}</Link>
                })}
            </ul>

            <div className='flex items-center gap-x-4'>
                <ThemeToggler />
                
                    {status==="authenticated" ? 
                        <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">

                            <Avatar className='p-1 rounded-full'>
                            <AvatarImage src={session.user!.image!} className='rounded-full'/>
                            <AvatarFallback>?</AvatarFallback>
                            </Avatar>

                        </DropdownMenuTrigger>
                  
                        <DropdownMenuContent>
                          <DropdownMenuItem >
                            {session.user!.email}
                          </DropdownMenuItem>
                          <div className='mt-2'>
                          <Button variant={"outline"} className=''>
                            <Link href={'/api/auth/signout'}>Logout</Link>
                            </Button>
                          </div>
                          
                        </DropdownMenuContent>
                      </DropdownMenu> 
                        
                        : 
                        <Button variant={"secondary"} className='ml-8'>
                        <Link href={'/api/auth/signin'}>Login</Link>
                        </Button>
                    }
            </div>
            
        </nav>
    )
}

export default Navbar
