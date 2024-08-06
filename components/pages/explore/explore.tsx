"use client";

import { Container, Section } from "@/components/craft";
import Post from "@/components/post";
import pb from "@/lib/pb";
import { ListResult, RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export default function Explore() {
  const [data, setData] = useState<ListResult<RecordModel> | null>(null);

  const fetchPosts = async (page: number) => {
    const posts = await pb.collection("posts").getList(page, 24,{expand:"userId"})
    return posts;
  };

  useEffect(() => {
    fetchPosts(1).then((data) => {
      setData(data);
    });
  }, []);

  

  return (
    <Section>
      <Container className="columns-3  gap-4 h-fit">
        {data && data.items?.map((post)=>(
            <Post key={post.id} post={post}/>
        ))}
      </Container>
    </Section>
  );
}
