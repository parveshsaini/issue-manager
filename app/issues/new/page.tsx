"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IssueForm {
    title: String;
    description: String
}

const NewIssuePage = () => {
    const {register, handleSubmit} = useForm<IssueForm>();
    const router = useRouter()
    return (
        <form 
            className='max-w-xl space-y-3'
            onSubmit={handleSubmit(async(data)=>{
                await axios.post('/api/issues', data)
                router.push('/')
            })}>
        
            <Input type="text" placeholder="Title" {...register('title')} />
            <Textarea placeholder="Type your message here." {...register('description')} />
            <Button variant="secondary">Submit new Issue</Button>

        </form>
    )
}

export default NewIssuePage
