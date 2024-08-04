"use server";
import pb from "@/lib/pb";
import { RecordModel } from "pocketbase";
import sharp from "sharp";

export async function POST(request: Request) {
  const formData = await request.formData();

  const image = formData.get("image") as File;
  const title = formData.get("title");
  const description = formData.get("description");
  const link = formData.get("link");
  const tags = formData.get("tags");
  const user = formData.get("user") as string;
  const userJson = JSON.parse(user) as RecordModel;

  const imageBuffer = await image.arrayBuffer();
  const sharpImage = await sharp(imageBuffer).webp().toBuffer();

  const blob = new Blob([sharpImage], { type: "image/webp" });

  const ImageFormData = new FormData();
  ImageFormData.append("image", blob, image.name);

  try {
    const newPost = await pb.collection("posts").create({
      title,
      link,
      description,
      tags: tags,
      userId: userJson.id,
      image: blob,
    });

    return Response.json({ success:newPost });
  } catch (error) {
    return Response.json({ error:"Error: Failed to create post" })
  }
}
