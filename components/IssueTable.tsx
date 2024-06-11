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
import StatusBadge from './StatusBadge'
import Link from 'next/link'
import { Issue } from '@prisma/client'
import { HiQuestionMarkCircle } from 'react-icons/hi'
import { Card } from './ui/card'


const IssueTable = ({issues}: {issues: Issue[]}) => {
  return (
    <Card>
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
        </Card>
  )
}

export default IssueTable
