import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from '@/prisma/client'
import StatusBadge from '@/components/StatusBadge'
import { HiQuestionMarkCircle } from "react-icons/hi";
import FilterIssue from '@/components/FilterIssue'
import { Status } from '@prisma/client'
import { skip } from 'node:test'
import Pagination from '@/components/Pagination'

interface Props{
  searchParams: {
    status: Status;
    page: string;
  }
}

const Issues = async ({searchParams}: Props) => {
  const statuses= Object.values(Status)
  const status= statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const page= parseInt(searchParams.page) || 1
  const pageSize= 5

  const issues= await prisma.issue.findMany({ 
    where: {status},
    skip: (page-1)* pageSize,
    take: pageSize
  })

  const issueCount= await prisma.issue.count({
    where: {status}
  })

  // await new Promise(resolve=> setTimeout(resolve, 2000))

  return (
    <div>
        <div className='flex items-center justify-between'>
          <FilterIssue/>
          <Button variant="secondary" className='mb-5'><Link href={"/issues/new"}>New Issue </Link></Button>
        </div>

        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Issue</TableHead>
              <TableHead className='hidden md:table-cell'>Status</TableHead>
              <TableHead >Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium"> 

                <Link href={`/issues/${issue.id}`}><div className='flex items-center gap-x-2 hover:underline'><HiQuestionMarkCircle/> {issue.title} </div>  </Link> 
                <div className='block md:hidden'><StatusBadge status={issue.status}/></div>
                
                </TableCell>
                <TableCell className='hidden md:table-cell'> <StatusBadge status={issue.status}/> </TableCell>
                <TableCell >{issue.createdAt.toDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className='flex justify-center mt-4'>
        <Pagination currentPage={page} itemsCount={issueCount} pageSize={pageSize} />

        </div>
    </div>
  )
}

export default Issues
