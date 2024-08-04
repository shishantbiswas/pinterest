"use client";

import { DownloadIcon, Share2Icon } from "lucide-react";
import { RecordModel } from "pocketbase";
import { useState } from "react";
import ImageError from "./image-error";

export default function Post({ post }: { post: RecordModel }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

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


  return (
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
      <div className="absolute flex flex-col justify-between bottom-0 right-0 h-full w-full group-hover:opacity-100 transition-all opacity-0 bg-gradient-to-br from-transparent to-black/80 text-white rounded-xl p-4">
        <h1 className="text-white capitalize text-2xl">{post?.title}</h1>
        <div className="flex items-end gap-2 justify-end text-sm">
         
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 p-2 border-2 dark:border-white rounded-full not-prose hover:bg-white/20 transition-all"
          >
            <DownloadIcon className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
