import { Status } from '@prisma/client';
import React from 'react'
import { Card } from './ui/card';
import Link from 'next/link';

interface Props{
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummmary = ({open, inProgress, closed}: Props) => {
    const containers: {
        label: string,
        count: number,
        status: Status
    }[]= [

        {label: 'Open Issues', count: open, status: 'OPEN'},
        {label: 'In Progress Issues', count: inProgress, status: 'IN_PROGRESS'},
        {label: 'Closed Issues', count: closed, status: 'CLOSED'},

    ]

    return (
        <div className='flex gap-x-3'>
            {containers.map((container)=> (
                <Card className='p-3'>
                    <Link href={`/issues?status=${container.status}`} className='flex flex-col gap-2 hover:scale-110 transition-all'>
                        <div className='text-md font-medium ' >{container.label}</div>
                        <div className='font-bold text-xl'>{container.count}</div>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default IssueSummmary
