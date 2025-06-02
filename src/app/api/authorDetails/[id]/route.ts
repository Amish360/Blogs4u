import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const author = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        bio: true,
        avatarUrl: true,
        _count: {
          select: { blogs: true },
        },
      },
    });

    if (!author) {
      return NextResponse.json(
        { message: "Author not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(author, { status: 200 });
  } catch (error) {
    console.error("[AUTHOR_DETAILS_GET_ERROR]", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
