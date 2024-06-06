import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Issue } from '@prisma/client'

const EditIssue = ({issue}: {issue: Issue}) => {
  return (
    <div>
      <Button variant={"secondary"}> <Link href={`/issues/${issue.id}/edit`}> Edit Issue </Link> </Button>
    </div>
  )
}

export default EditIssue
