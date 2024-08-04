"use client";
import { Container, Section } from "@/components/craft";
import UserDetails from "./user-details";
import { useEffect, useState } from "react";
import pb from "@/lib/pb";
import { RecordModel } from "pocketbase";
import ProfileTabs from "./profile-tabs";

export default function Profile({ id }: { id: string }) {
  const [posts, setPosts] = useState<RecordModel[] | null>(null);
  const [userDetails, setUserDetails] = useState<RecordModel | null>(null);

  const fetchUser = async () => {
    const user = await pb.collection("users").getOne(id);
    return user;
  };

  const fetchPosts = async () => {
    const posts = await pb
      .collection("posts")
      .getFullList({ filter: `userId.id~"${id}"` });
    return posts;
  };

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
    });
    fetchUser().then((user) => {
      setUserDetails(user)
    });
  }, []);

  return (
    <Section>
      <Container>
        <UserDetails user={userDetails} />
        <ProfileTabs posts={posts} id={id} />
      </Container>
    </Section>
  );
}
