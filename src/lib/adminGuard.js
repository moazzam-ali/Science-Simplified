// lib/adminGuard.js
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function requireAdmin(request) {
  const token = request.cookies.get("auth")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  let payload;
  try {
    payload = verify(token, process.env.JWT_SECRET || "your-secret-key");
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  if (!payload.isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  // success → return the decoded payload if you need it
  return payload;
}
