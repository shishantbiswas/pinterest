"use client";

import { CheckCircle2Icon, PencilIcon, UserCircle2, XIcon } from "lucide-react";
import { RecordModel } from "pocketbase";
import { useCallback, useState } from "react";
import ImageDropzone from "../image-dropzone";
import pb from "@/lib/pb";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

export default function UserDetails({
  userDetails,
}: {
  userDetails: RecordModel | null;
}) {
  
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);
  
  const signedInUser = useUser();
  if (!userDetails) return;
  
  const updateAvatar = async () => {
    if (!image) {
      toast.error("Error: Images is missing !");
      return;
    }
    const imageBuffer = await image?.arrayBuffer();
    const blob = new Blob([imageBuffer], { type: "image/webp" });

    await pb.collection("users").update(userDetails.id, {
      avatar: blob,
    });

    toast.success("Avatar Updated Successfully");
    setOpenModal(false);
  };

  return (
    <div className="not-prose group size-full flex items-center flex-col ">
      <div className="relative flex items-center justify-center h-full">
        {userDetails.avatar ? (
          <img
            className="size-28 rounded-full"
            src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${userDetails.collectionId}/${userDetails.id}/${userDetails.avatar}`}
            alt={userDetails.name || userDetails.username}
          />
        ) : (
          <div className="size-28 rounded-full bg-black/20 flex items-center justify-center">
            <UserCircle2 className="size-12" />
          </div>
        )}
        {userDetails.id == signedInUser?.id && (
          <div
            onClick={() => setOpenModal(true)}
            className="absolute top-0 hover:bg-white/60 hover:backdrop-blur-lg opacity-0 hover:opacity-100 cursor-pointer transition-all size-full rounded-full flex items-center justify-center"
          >
            <PencilIcon className="size-8" />
          </div>
        )}
        {openModal && (
          <div className=" absolute top-32 rounded-lg z-20 bg-gray-100 w-[400px] py-4 flex items-center justify-center px-12 flex-col">
            <div className=" flex items-center justify-between w-full my-4">
              <h1 className="text-xl font-semibold">Update Avatar</h1>
              <XIcon
                onClick={() => setOpenModal(false)}
                className="p-2 size-10 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all"
              />
            </div>
            {!image ? (
              <div className=" h-[200px] mb-4">
                <ImageDropzone className="w-full h-full" onDrop={onDrop} />
              </div>
            ) : (
              <div className="relative w-full flex items-center justify-center flex-col h-[270px] mb-4">
                <img
                  className="rounded-full aspect-square size-[150px] "
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                />
                <div className="flex items-center gap-4 text-sm">
                  <button
                    onClick={() => setImage(null)}
                    className="py-2 mt-4 rounded-md text-white bg-red-500 flex items-center text-nowrap px-4"
                  >
                    Remove Image
                  </button>
                  <button
                    onClick={updateAvatar}
                    className="py-2 mt-4 rounded-md text-white bg-black/80 flex items-center text-nowrap px-4"
                  >
                    Confirm Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center flex gap-1 items-center flex-col">
        <h1 className="text-2xl flex gap-2 items-center mt-4">
          {userDetails.name || userDetails.username}
          {<CheckCircle2Icon className="size-4" />}
        </h1>
        <h3 className="text-sm">
          @{userDetails.name ? userDetails.username : null}
        </h3>
      </div>
    </div>
  );
}
