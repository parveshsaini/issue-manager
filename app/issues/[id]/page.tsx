import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import StatusBadge from '@/components/StatusBadge'
import { Separator } from '@/components/ui/separator'
import IssueDetails from '@/components/IssueDetails'
import EditIssue from '@/components/EditIssue'

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

            <EditIssue issue={issue} />
        </div>

    )
}

export default IssueDetailsPage
