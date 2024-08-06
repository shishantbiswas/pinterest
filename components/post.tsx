"use client";

import {
  DownloadIcon,
  ExternalLinkIcon,
  FileCheck,
  SaveIcon,
  Share2Icon,
  X,
} from "lucide-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";
import ImageError from "./image-error";
import pb from "@/lib/pb";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Post({ post }: { post: RecordModel }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [userLikedImages, setUserLikedImages] = useState<RecordModel | null>(
    null
  );
  // const [userDetails, setUserDetails] = useState<RecordModel | null>(null);

  const user = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPostId = searchParams.get("post");

  const handleDownload = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = post?.title || post.image;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const saveImage = async () => {
    if (!user) return;
    const previousImages = await pb.collection("users").getOne(user.id);
    const res = await pb.collection("users").update(user?.id, {
      likedPost: [...previousImages.likedPost, post.id],
    });
    setUserLikedImages(res);
  };

  const removeImage = async () => {
    if (!user) return;
    const previousImages = await pb.collection("users").getOne(user.id);
    const previousImageIds: string[] = previousImages.likedPost;
    const updatedImageIds = previousImageIds.filter((id) => id !== post.id);

    const res = await pb.collection("users").update(user?.id, {
      likedPost: updatedImageIds,
    });
    setUserLikedImages(res);

    toast.success("Removed from saved Images", {
      description: "Refresh page to see updated list",
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/${pathname}?post=${post.id}`
      );
      toast("Link copied to clipboard!");
    } catch (err) {
      toast("Failed to copy text.");
    }
  };

  // const fetchUser = async () => {
  //   const user = await pb.collection("users").getOne(post.userId);
  //   return user;
  // };

  // useEffect(() => {
  //     fetchUser().then((user) => {
  //     setUserDetails(user);
  //   });
  // }, [user]);

  return (
    <>
      <div className="relative group h-fit break-inside-avoid mb-4">
        {!loaded && !error && (
          <div className="h-[250px] aspect-square rounded-xl w-full absolute top-0 right-0 bg-black/50 animate-pulse" />
        )}
        {error ? (
          <ImageError className="bg-gray-200" />
        ) : (
          <img
            className="w-full h-fit rounded-xl  m-0 md:m-0 "
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
            alt={post.title}
          />
        )}
        <div
          onClick={() => router.push(`${pathname}?post=${post.id}`)}
          className="absolute flex flex-col justify-between bottom-0 right-0 h-full w-full group-hover:opacity-100 transition-all opacity-0 bg-gradient-to-br from-transparent to-black/80 text-white rounded-xl p-4"
        >
          <h1 className="text-white capitalize text-2xl">{post?.title}</h1>
          <div className="flex items-end  gap-2 justify-end text-sm">
            {user?.likedPost.includes(post.id) ||
            userLikedImages?.likedPost.includes(post.id) ? (
              <button
                onClick={removeImage}
                className="flex items-center disabled:opacity-30 gap-2 p-2 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
              >
                <FileCheck className="size-4 text-white" />
              </button>
            ) : (
              <button
                onClick={saveImage}
                className="flex items-center disabled:opacity-30 gap-2 p-2 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
              >
                <SaveIcon className="size-4 text-white" />
              </button>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 p-2 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
            >
              <DownloadIcon className="size-4 text-white" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center disabled:opacity-30 gap-2 py-1.5 p-2 border-2 dark:border-white rounded-full not-prose bg-white text-black"
            >
              <Share2Icon className="size-4 text-black" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: post.id == selectedPostId ? "100%" : "0%",
          pointerEvents: post.id == selectedPostId ? "all" : "none",
        }}
        className="min-h-full w-full fixed px-12 top-0 left-0 z-20 bg-black/40 transition-all backdrop-blur flex items-end justify-center"
      >
        <div
          style={{
            transform:
              post.id == selectedPostId
                ? "translateY(0px)"
                : "translateY(300px)",
          }}
          className="bg-white h-[80vh] duration-500 overflow-y-scroll transition-all p-8 pb-28 rounded-t-lg min-h-12 w-full max-w-3xl"
        >
          <div className=" flex items-center justify-between ">
            <h1 className=" text-start  capitalize h-fit not-prose text-4xl font-semibold">
              {post.title}
            </h1>
            <button
              onClick={() => router.push(pathname)}
              className=" transition-all  hover:bg-red-600 hover:text-white items-center rounded-full p-2 size-10 aspect-square"
            >
              <X />
            </button>
          </div>
          <div className="flex items-end gap-2 mt-4">
            {user?.likedPost.includes(post.id) ||
            userLikedImages?.likedPost.includes(post.id) ? (
              <button
                onClick={removeImage}
                className="flex items-center disabled:opacity-30 gap-2 py-1 px-3 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
              >
                <FileCheck className="size-4 text-white" />
              </button>
            ) : (
              <button
                onClick={saveImage}
                className="flex items-center disabled:opacity-30 gap-2 py-1 px-3 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
              >
                <SaveIcon className="size-4 " />
                Save
              </button>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 py-1 px-3 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
            >
              <DownloadIcon className="size-4 " />
              Download
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center disabled:opacity-30 gap-2 py-1 px-3 border-2 dark:border-white rounded-full not-prose bg-white text-black"
            >
              <Share2Icon className="size-4 text-black" />
              Share
            </button>
            <Link
              href={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
              target="_blank"
              className="flex items-center gap-2 py-1 px-3 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
            >
              <ExternalLinkIcon className="size-4 " />
              Open in New Tab
            </Link>
          </div>
          <div>
            <div
            onClick={()=>router.push(`/profile/${post?.expand?.userId.id}`)}
            className="flex hover:bg-gray-100 transition-all cursor-pointer py-2 px-3 rounded-lg w-fit items-center justify-start gap-4 not-prose mt-4">
              <img
                className="size-[50px] rounded-full"
                src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post?.expand?.userId.collectionId}/${post?.expand?.userId.id}/${post?.expand?.userId.avatar}`}
                alt={post?.expand?.userId.name}
              />
              <div>
                <p className="text-lg">{post?.expand?.userId.name}</p>
                <p className="opacity-60 text-sm">{"@"+post?.expand?.userId.username}</p>
              </div>
            </div>
          </div>
          <img
            src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
            alt={post.title}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
