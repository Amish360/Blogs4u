import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const blogId = parseInt((await params).id);

    if (isNaN(blogId)) {
      return NextResponse.json(
        { error: "Invalid blog ID or No Blog ID found" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        category: true,
        user: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const blogId = parseInt((await params).id);
    if (isNaN(blogId)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const blog = await prisma.blog.delete({
      where: { id: blogId },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const blogId = parseInt((await params).id);
    if (isNaN(blogId)) {
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const categoryId = Number(formData.get("categoryId"));
    const image = formData.get("image") as File | null;

    let imageUrl: string | undefined;

    // Only upload if a new image is provided
    if (image && image instanceof File && image.type.startsWith("image/")) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUri = `data:${image.type};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "blogs",
      });

      imageUrl = uploadResult.secure_url;
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        content,
        categoryId,
        ...(imageUrl && { coverImage: imageUrl }), // only update if image uploaded
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
