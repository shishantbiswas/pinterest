import { Container, Main, Section } from "@/components/craft";
import CreatePost from "@/components/pages/post/create-post";

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
