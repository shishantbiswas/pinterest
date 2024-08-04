import { Container, Main, Section } from "@/components/craft";
import SignIn from "@/components/pages/auth/sign-in";

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
