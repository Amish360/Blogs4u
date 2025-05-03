import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req:Request){
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId");

    if(!userId){
        return NextResponse.json({error:"Missing User ID"},{status:400});
    }

    const user = await prisma.user.findUnique({
        where:{id:parseInt(userId)},
        select:{
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
        createdAt: true,
        updatedAt: true,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({user});
}