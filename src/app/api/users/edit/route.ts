import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTokenData } from "@/lib/jwt";
import { headers } from "next/headers";

const prisma = new PrismaClient();

interface TokenPayload {
  id: number;
  email: string;
}

export async function PATCH(req: Request) {
  const headerList = await headers();
  const authHeader = headerList.get("authorization");

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized, No token" },
      { status: 401 }
    );
  }

  const userData = (await getTokenData(token)) as TokenPayload | null;
  if (!userData?.id) {
    return NextResponse.json(
      { error: "Unauthorized, Invalid Token" },
      { status: 401 }
    );
  }

  const { name, avatarUrl, bio } = await req.json();

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
