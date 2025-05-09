import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/jwt";
import { JWTPayload } from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  // Verify the token and assert the type as JWTPayload
  const user = (await verifyToken(token || "")) as JWTPayload | null;

  // Check if user is null or if user.id is undefined
  if (!user || typeof user.id !== 'number') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, categoryId, coverImage, published } = body;

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      categoryId,
      coverImage,
      published,
      userId: user.id,  // Now safely assigning the user.id as a number
    },
  });

  return NextResponse.json(blog);
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categoryId = parseInt(searchParams.get("categoryID") || "0");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    where: {
      categoryId,
    },
    skip,
    take: limit,
    include: {
      user: true,
      category: true,
    },
  });

  return NextResponse.json(blogs);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, title, content, coverImage, published, categoryId } = body;

  const updated = await prisma.blog.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
      coverImage,
      published,
      categoryId,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
  }

  await prisma.blog.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ message: "Deleted" });
}
