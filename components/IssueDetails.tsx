import React from 'react'
import { Separator } from './ui/separator'
import { Issue } from '@prisma/client'
import StatusBadge from './StatusBadge'

const IssueDetails = ({issue}: {issue: Issue}) => {
    return (
        <div>
            <h1 className='font-bold text-2xl'>{issue.title}</h1>

            <Separator className="mb-4" />

            <div className='flex space-x-3 mb-4'>
                <StatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </div>
            <div className='border p-2 min-h-24 border-slate-400 rounded-lg'>
                <p>{issue.description}</p>
            </div>
            
        </div>
    )
}

export default IssueDetails
