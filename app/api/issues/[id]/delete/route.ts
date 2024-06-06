import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params: {id: string}
}

export async function DELETE(req: NextRequest, {params}: Props){
    const issue= await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    })

    if(!issue){
        return NextResponse.json({error: 'Issue not found'}, {status: 404})
    }

    await prisma.issue.delete({
        where: {id: parseInt(params.id)}
    })

    return NextResponse.json({status: 200})
}       