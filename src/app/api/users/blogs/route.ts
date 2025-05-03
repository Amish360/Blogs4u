import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId");

    if(!userId){
        return NextResponse.json({error:"Missing User ID"},{status:400});
    }

    const blogs = await prisma.blog.findMany({
        where: {userId:parseInt(userId)},
        include:{
            category:true,
        },
        orderBy:{
            createdAt:"desc",
        },
    });

    return NextResponse.json({blogs});
}