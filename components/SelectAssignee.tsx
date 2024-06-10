"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { SelectGroup } from '@radix-ui/react-select'
import { Issue, User } from '@prisma/client'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Image from "next/image"
import { IoCloseCircleOutline } from "react-icons/io5";

  
const SelectAssignee = ({issue}: {issue: Issue}) => {
  
    const {data: users, error, isLoading}= useQuery({
        queryKey: ['users'],
        queryFn: ()=> axios.get<User[]>('/api/users').then(res=> res.data),
        staleTime: 60 *1000, //60sec
        retry: 3
    })

    if(isLoading) return "Loading..."
    if(error) return null

    return (
        <Select 
            defaultValue={issue.assignedToUserId || " "}
            onValueChange={async(userId)=>{
                await axios.patch(`/api/issues/${issue.id}/edit`, {assignedToUserId : userId === " " ? null : userId})
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assign issue"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Suggested Users!</SelectLabel>

                    <SelectItem value=" "><div className="flex items-center gap-x-2"> <IoCloseCircleOutline className="h-5 w-5"/> Unassigned</div></SelectItem>

                    {users?.map((user)=> <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-x-2"> <Image className="rounded-full" src={user.image!} alt={user.name!} width={20} height={20}/> {user.name}</div>
                    
                    </SelectItem>)}

                </SelectGroup>
            </SelectContent>
        </Select>

  )
}

export default SelectAssignee
