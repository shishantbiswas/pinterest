"use client";
import { cn } from "@/lib/utils";
import { CrossIcon, UploadIcon } from "lucide-react";
import React from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Balancer from "react-wrap-balancer";
export default function ImageDropzone({
  onDrop,
  className
}: {
  onDrop: (acceptedFiles: File[], fileRejections?: FileRejection[]) => void;
  className?:string
}) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isDragActive && "border-muted-foreground/50",
        className
      )}
    >
      <input {...getInputProps()} accept="image/*" multiple={false}/>
      {isDragActive ? (
        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
          <div className="rounded-full border border-dashed p-3">
            <UploadIcon
              className="size-7 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="font-medium text-muted-foreground">
            Drop the files here
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
          <div className="rounded-full border border-dashed p-3">
            <UploadIcon
              className="size-7 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div className="space-y-px">
            <p className="font-medium text-muted-foreground">
              Drag {`'n`} drop file here, or click to select file
            </p>
            <p className="text-sm text-muted-foreground/70">
              <Balancer>You can upload JPEG, PNG, WEBP, AVIF Images</Balancer>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
