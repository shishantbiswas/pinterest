import { Container, Main, Section } from "@/components/craft";
import SignUp from "@/components/pages/auth/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Pinterest",
  description: "Pinterest Clone with Next JS and Tailwindcss",
};

export default function SignUpPage() {
  return (
    <Main>
      <Section>
        <Container>
          <SignUp />
        </Container>
      </Section>
    </Main>
  );
}
