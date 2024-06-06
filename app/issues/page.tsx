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

const Issues = async () => {
  const issues= await prisma.issue.findMany()
  await new Promise(resolve=> setTimeout(resolve, 2000))

  return (
    <div>
        <Link href={"/issues/new"}>
            <Button variant="secondary" className='mb-5'>New Issue</Button>
        </Link>

        <Table className="">
          <TableCaption>A list of all issues.</TableCaption>
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
    </div>
  )
}

export default Issues
