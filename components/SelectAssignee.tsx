"use client"

import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SelectGroup } from '@radix-ui/react-select'
import { User } from '@prisma/client'
import axios from 'axios'
  
const SelectAssignee = () => {
  const [users, setUsers]= useState<User[]>([])

  useEffect(()=> {
    const fetchUsers= async()=>{
        const {data} = await axios.get<User[]>('/api/users')

        setUsers(data)
    }

    fetchUsers()
  }, [])

  return (
    <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assign issue"/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Suggested Users!</SelectLabel>
  
                {users.map((user)=> <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
                
            </SelectGroup>
        </SelectContent>
    </Select>

  )
}

export default SelectAssignee
