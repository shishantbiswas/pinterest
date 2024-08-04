"use client";

import { CheckCircle2Icon } from "lucide-react";
import { RecordModel } from "pocketbase";

export default function UserDetails({ user }: { user: RecordModel | null }) {
  if (!user) return;
  return (
    <div className="not-prose flex items-center flex-col">
      <img
        className="size-28 rounded-full"
        src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${user.collectionId}/${user.id}/${user.avatar}`}
        alt=""
      />
      <div className="text-center flex gap-1 items-center flex-col">
        <h1 className="text-2xl flex gap-2 items-center mt-4">
          {user.name || user.username}
          {<CheckCircle2Icon className="size-4" />}
        </h1>
        {user.emailVisibility && <h3 className="text-sm">{user.email}</h3>}
        <h3 className="text-sm">@{user.name ? user.username : null}</h3>
      </div>
    </div>
  );
}
