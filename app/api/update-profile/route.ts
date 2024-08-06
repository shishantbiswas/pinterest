"use server";

import pb from "@/lib/pb";
import { RecordModel } from "pocketbase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const username = formData.get("username");
  const user = formData.get("user") as string;
  const userJson = JSON.parse(user) as RecordModel;

  await pb.collection("users").update(userJson.id, {
    username: username,
    name: name,
  });
  return Response.json({ success: "detailes updated" });
}
