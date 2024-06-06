"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { z } from "zod"
import {issueSchema} from "@/types/issueValidation"
import { Issue } from '@prisma/client'


type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ( { issue }: { issue?: Issue }) => {
    const {register, handleSubmit} = useForm<IssueFormData>();
    const router = useRouter()

    const createIssue= async(data: IssueFormData)=>{
        try {               
            toast.promise(
                axios.post('/api/issues', data).then(()=> router.push('/')),
                 {
                   loading: 'Saving...',
                   success: <b>Success!</b>,
                   error: <b>Could not save.</b>,
                 }
            );
            router.refresh()

        } catch (error: any) {
            toast.error(error)
        }
    }

    const updateIssue= async(data: IssueFormData)=>{
        try {  
            toast.promise(
                axios.patch(`/api/issues/${issue?.id}/edit`, data).then(()=> router.push('/')),
                 {
                   loading: 'Updating...',
                   success: <b>Success!</b>,
                   error: <b>Could not save.</b>,
                 }
            );
            router.refresh()

        } catch (error: any) {
            toast.error(error)
        }
    }

    return (
        <form 
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(issue? updateIssue: createIssue)}>
        
            <Input defaultValue={issue?.title} type="text" placeholder="Title" {...register('title')} />
            <Textarea defaultValue={issue?.description} placeholder="Type your message here." {...register('description')} />
            <Button variant="secondary">{issue ? 'Update Issue' : 'Submit new Issue'}</Button>

        </form>
    )
}

export default IssueForm
