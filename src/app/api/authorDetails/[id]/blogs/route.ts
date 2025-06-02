// app/api/authorDetails/[id]/blogs/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorId = parseInt((await params).id);

  if (isNaN(authorId)) {
    return NextResponse.json({ error: "Invalid author ID" }, { status: 400 });
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        userId: authorId,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs by author ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
