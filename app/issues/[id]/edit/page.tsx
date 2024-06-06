import IssueForm from '@/components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {id: string}
}

const IssueEditPage = async ({params}: Props) => {

    const issue= await prisma.issue.findUnique({
      where: {id: parseInt(params.id)}
    })

    if(!issue) notFound()

    return (
      <IssueForm issue={issue} />
    )
}

export default IssueEditPage
