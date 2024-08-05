import { Container, Main, Section } from "@/components/craft";
import CreatePost from "@/components/pages/post/create-post";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Post - Pinterest",
  description: "Pinterest Clone with Next JS and Tailwindcss",
};

export default function CreatePostPage() {
  return (
    <Main>
      <Section>
        <Container>
          <CreatePost />
        </Container>
      </Section>
    </Main>
  );
}
