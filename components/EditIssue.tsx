import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Issue } from '@prisma/client'

const EditIssueButton = ({issue}: {issue: Issue}) => {
  return (
    <div>
      <Button variant={'outline'} className='bg-violet-500'> <Link href={`/issues/${issue.id}/edit`}> Edit Issue </Link> </Button>
    </div>
  )
}

export default EditIssueButton
