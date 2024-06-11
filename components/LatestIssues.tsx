import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link'
import StatusBadge from './StatusBadge'
import prisma from '@/prisma/client'
import Image from 'next/image'
import { Card } from './ui/card'
import { Separator } from './ui/separator'

const LatestIssues = async() => {
  const issues= await prisma.issue.findMany({
    orderBy: {createdAt: 'desc'},
    take: 6,
    include: { assignedToUser: true }
  })

  return (
    <Card>
        <h1 className='ml-4 text-3xl font-bold mb-4 '>Latest Issues</h1>
        <Separator/>

      <Table className="">
          
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id} className='flex items-center justify-between'>
                
                <TableCell className="font-medium"> 
                    <div className='flex flex-col ml-2'>
                        <Link href={`/issues/${issue.id}`}><div className='flex items-center gap-x-2 hover:underline'> {issue.title} </div>  </Link> 
                        <div className=''><StatusBadge status={issue.status}/></div>
                    </div>
                </TableCell>
                
                {issue.assignedToUser && <TableCell > <Image 
                    src={issue.assignedToUser.image!} 
                    alt={issue.assignedToUser.name!}
                    width={30} height={30}
                    className='rounded-full mr-4'/> 
                </TableCell>}

               
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </Card>
  )
}

export default LatestIssues
