import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Issues = () => {
  return (
    <div>
        <Link href={"/issues/new"}>
            <Button variant="secondary">New Issue</Button>
        </Link>
    </div>
  )
}

export default Issues
