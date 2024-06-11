import FilterIssue from '@/components/FilterIssue'
import IssueTable from '@/components/IssueTable'
import Pagination from '@/components/Pagination'
import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Metadata } from 'next'
import Link from 'next/link'

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
        <div className='flex items-center justify-between mb-5'>
          <FilterIssue/>
          <Button variant="secondary" className=''><Link href={"/issues/new"}>New Issue </Link></Button>
        </div>

        <IssueTable issues={issues}/>
        
        <div className='flex justify-center mt-4'>
          <Pagination currentPage={page} itemsCount={issueCount} pageSize={pageSize} />
        </div>
    </div>
  )
}

export default Issues

export const metadata: Metadata= {
  title: 'Issue Manager - Issues',
  description: 'All listed Issues'
}
