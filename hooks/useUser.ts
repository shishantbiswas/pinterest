"use client";
import { useEffect, useState } from "react";
import pb from "@/lib/pb";

import { RecordModel } from "pocketbase";
import { usePathname } from "next/navigation";

export default function useUser() {
  const [user, setUser] = useState<RecordModel | null>(null);

  const isValid = pb.authStore.isValid;
  const token = pb.authStore.token;
  const modelId = pb?.authStore?.model?.id;
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!modelId) {
        return;
      } else {
        try {
          const userData = await pb.collection("users").getOne(modelId);
          setUser(userData);
        } catch (error) {
          setUser(null);
        }
      }
    };

    fetchUserData();
  }, [isValid, token, modelId, pb.authStore.clear, pathname]);

  return user
}
