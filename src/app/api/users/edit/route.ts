import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTokenData } from "@/lib/jwt";

const prisma = new PrismaClient();

interface TokenPayload {
    id: number;
    email: string;
  }

export async function PATCH(req:Request){
    const token = req.headers.get("authorization")?.split(" ")[1];

    if(!token){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    const userData = getTokenData(token) as TokenPayload | null;
    if(!userData?.id){
        return NextResponse.json({error:"Unauthorized"},{status:401})
    }

    const {name,avatarUrl,bio}= await req.json();

    const updatedUser = await prisma.user.update({
        where: { id: userData.id },
        data: {
          name,
          avatarUrl,
          bio,
        },
      });
      

    return NextResponse.json({ message: "Profile updated", user: updatedUser });
}