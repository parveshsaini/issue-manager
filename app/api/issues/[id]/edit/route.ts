import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/types/issueValidation";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

interface Props {
    params: {id: string}
}

export const PATCH= async(req: NextRequest, {params}: Props)=>{
    //validate body
    // find issue
    //check if issue present
    //update the issue
    const session= await getServerSession(authOptions)
    if(!session)
        return NextResponse.json({}, {status: 401})

    const body= await req.json();

    const validation= issueSchema.safeParse(body)

    if(!validation.success){
        return NextResponse.json(validation.error.format(), {status: 400})
    }

    const issue= prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue){
        return NextResponse.json({error: "invalid issue"}, {status: 404})
    }

    const updatedIssue= await prisma.issue.update({
        where: {id: parseInt(params.id)},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, {status: 200})

    
}