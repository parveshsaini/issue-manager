"use client"

import { Status } from '@prisma/client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import { useRouter } from 'next/navigation'

const FilterIssue = () => {
    const statuses: { label: string, value?: Status}[]= [
        {label: 'All'},
        {label: 'Open', value: 'OPEN'},
        {label: 'In Progress', value: 'IN_PROGRESS'},
        {label: 'Closed', value: 'CLOSED'},
    ]

    const router= useRouter();

    return (
        <Select onValueChange={(status)=> {
            const query= status=== ' ' ? "" : `?status=${status}` 
            router.push('/issues' + query)
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By Status"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Select Status</SelectLabel>

                    {statuses.map((status)=> <SelectItem key={status.label} value={status.value || ' '}>{status.label}</SelectItem>)}

                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default FilterIssue
