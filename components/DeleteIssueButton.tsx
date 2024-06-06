"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'


const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router= useRouter()
    
    const handleDelete= async()=>{
        try {  
            toast.promise(
                axios.delete(`/api/issues/${issueId}/delete`).then(()=> router.push('/')),
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

    return (
        <div>
        <Button variant={'outline'} className='bg-red-500' onClick={handleDelete}>
        Delete Issue
        </Button>
        </div>
    )
}

export default DeleteIssueButton
