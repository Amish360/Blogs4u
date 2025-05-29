import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getTokenData } from "@/lib/jwt";
import { headers } from "next/headers";
import cloudinary from "@/lib/cloudinary";

const prisma = new PrismaClient();

interface TokenPayload {
  id: number;
  email: string;
}

export async function PATCH(req: Request) {
  const headerList = headers();
  const authHeader = (await headerList).get("authorization");
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

  const formData = await req.formData();

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const avatar = formData.get("avatar") as File | null;

  let avatarUrl: string | undefined;

  if (avatar && avatar instanceof File && avatar.type.startsWith("image/")) {
    const buffer = Buffer.from(await avatar.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${avatar.type};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "avatars",
    });

    avatarUrl = uploadResult.secure_url;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userData.id },
    data: {
      name,
      bio,
      ...(avatarUrl && { avatarUrl }),
    },
  });

  return NextResponse.json({
    message: "Profile updated",
    user: updatedUser,
  });
}
