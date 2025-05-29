import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/lib/jwt";
import { JWTPayload } from "jose";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  const user = (await verifyToken(token || "")) as JWTPayload | null;

  if (!user || typeof user.id !== "number") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = Number(formData.get("categoryId"));
  const published = formData.get("published") === "true";
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "Invalid image" }, { status: 400 });
  }

  // Convert File to Buffer
  const buffer = Buffer.from(await image.arrayBuffer());

  // Convert to base64
  const base64 = buffer.toString("base64");
  const dataUri = `data:${image.type};base64,${base64}`;

  // Upload to Cloudinary
  const uploadResult = await cloudinary.uploader.upload(dataUri, {
    folder: "blogs", // Optional: saves in a folder in Cloudinary
  });

  const imageUrl = uploadResult.secure_url;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      categoryId,
      published,
      userId: user.id,
      coverImage: imageUrl,
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

    return NextResponse.json({
      message: "Blog deleted successfully",
      deletedBlog,
    });
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
