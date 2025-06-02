import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const authors = await prisma.user.findMany({
      take: 5,
      orderBy: {
        blogs: {
          _count: "desc", // sort by blog count
        },
      },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    return NextResponse.json({ authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
