"use client";
import { Container, Section } from "@/components/craft";
import UserDetails from "./user-details";
import { useEffect, useState } from "react";
import pb from "@/lib/pb";
import { RecordModel } from "pocketbase";
import ProfileTabs from "./profile-tabs";
import useUser from "@/hooks/useUser";

export default function Profile({ id }: { id: string }) {
  const [posts, setPosts] = useState<RecordModel[] | null>(null);
  const [userDetails, setUserDetails] = useState<RecordModel | null>(null);
  const [likedPosts, setLikedPosts] = useState<RecordModel | undefined | null>(
    null
  );

  const user = useUser();
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

  const fetchLikedPost = async () => {
    if (!user) return;
    const savedPosts = await pb
      .collection("users")
      .getOne(user?.id, { expand: "likedPost" });
    return savedPosts;
  };

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
    });
    fetchUser().then((user) => {
      setUserDetails(user);
    });
    fetchLikedPost().then((likedPost) => {
      setLikedPosts(likedPost);
    });
  }, [user]);


  return (
    <Section>
      <Container>
        <UserDetails user={userDetails} />
        <ProfileTabs posts={posts} id={id} likedPosts={likedPosts} />
      </Container>
    </Section>
  );
}
