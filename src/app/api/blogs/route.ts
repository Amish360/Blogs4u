import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/jwt";
import { JWTPayload } from "jose";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const user = (await verifyToken(token || "")) as JWTPayload | null;

  if (!user || typeof user.id !== "number") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, categoryId, coverImage, published } = body;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return NextResponse.json(
      { error: "Invalid category ID: Category does not exist" },
      { status: 400 }
    );
  }

 
  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      categoryId,
      coverImage,
      published,
      userId: user.id,
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

  const existingBlog = await prisma.blog.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

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

  try {
    const deletedBlog = await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    
    return NextResponse.json({ message: "Blog deleted successfully", deletedBlog});
  } catch (error: unknown) {
  
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to delete the blog", details: error.message },
        { status: 500 }
      );
    }

  
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}