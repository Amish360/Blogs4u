import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing Credentials" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });

  return NextResponse.json({ message: "Login Successful", token });
}
