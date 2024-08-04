"use server";

import pb from "@/lib/pb";
import { RecordModel } from "pocketbase";
import sharp from "sharp";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const username = formData.get("username");
  const image = formData.get("image") as File;
  const user = formData.get("user") as string;
  const userJson = JSON.parse(user) as RecordModel;


  if (!image) {
    await pb.collection("users").update(userJson.id, {
      username: username,
      name: name ,
    });
    return Response.json({success:"detailes updated without avatar"});

  }

  const imageBuffer = await image.arrayBuffer();
  const sharpImage = await sharp(imageBuffer).webp().toBuffer();

  const blob = new Blob([sharpImage], { type: "image/webp" });

  const ImageFormData = new FormData();
  ImageFormData.append("image", blob, image.name);
  
  await pb.collection("users").update(userJson.id, {
    username: username ,
    name: name ,
    avatar:blob
  });

  return Response.json({success:"detailes updated with avatar"});
}
