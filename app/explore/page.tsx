import { Container, Main, Section } from "@/components/craft";
import Explore from "@/components/pages/explore/explore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore - Pinterest",
  description: "Pinterest Clone with Next JS and Tailwindcss",
};

export default function Profile() {
  return (
    <Main>
      <Section>
        <Container>
            <Explore />
        </Container>
      </Section>
    </Main>
  );
}
