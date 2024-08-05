import { Container, Main, Section } from "@/components/craft";
import SignIn from "@/components/pages/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Pinterest",
  description: "Pinterest Clone with Next JS and Tailwindcss",
};

export default function SignInPage() {
  return (
    <Main>
      <Section>
        <Container>
          <SignIn />
        </Container>
      </Section>
    </Main>
  );
}
