import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueDetails from '@/components/IssueDetails'
import DeleteIssueButton from '@/components/DeleteIssueButton'
import EditIssueButton from '@/components/EditIssue'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({params}: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if(!issue)
        notFound()

    return (
        <div className='grid md:grid-cols-2 gap-x-6'>
            <IssueDetails issue={issue} />
            
            <div className='flex flex-col gap-3'>
                <EditIssueButton issue={issue} />
                <DeleteIssueButton issueId= {issue.id} />
            </div>
        </div>

    )
}

export default IssueDetailsPage
