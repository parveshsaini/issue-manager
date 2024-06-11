import IssueForm from '@/components/IssueForm'
import { Metadata } from 'next'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  )
}

export default NewIssuePage

export const metadata: Metadata= {
  title: 'Issue Manager - Create Issue',
  description: 'Create a new Issue'
}
