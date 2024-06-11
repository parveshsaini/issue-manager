import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueDetails from '@/components/IssueDetails'
import DeleteIssueButton from '@/components/DeleteIssueButton'
import EditIssueButton from '@/components/EditIssue'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import SelectAssignee from '@/components/SelectAssignee'
import { cache } from 'react'

interface Props {
    params: { id: string }
}

const fetchIssue= cache((issueId: number)=> prisma.issue.findUnique({where: {id: issueId}}))

const IssueDetailsPage = async ({params}: Props) => {
    const session= await getServerSession(authOptions)

    const issue = await fetchIssue(parseInt(params.id))

    if(!issue)
        notFound()

    return (
        <div className='grid md:grid-cols-2 gap-x-6 gap-y-3'>
            <IssueDetails issue={issue} />
            
            {session && <div className='flex flex-col gap-3'>
                <SelectAssignee issue={issue} />
                <EditIssueButton issue={issue} />
                <DeleteIssueButton issueId= {issue.id} />
            </div>}
        </div>

    )
}

export default IssueDetailsPage

export async function generateMetadata({params}: Props){
    const issue = await fetchIssue(parseInt(params.id))

    return {
        title: issue?.title,
        description: issue?.description
    }
}