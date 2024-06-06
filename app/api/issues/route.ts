import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {issueSchema} from "@/types/issueValidation"

export async function POST(req: NextRequest){
    const body=  await req.json()
    const validation= issueSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    //valid body
    const newIssue= await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, {status: 201})

}