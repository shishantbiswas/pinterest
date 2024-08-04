import { Container, Main, Section } from "@/components/craft";
import SignUp from "@/components/pages/auth/sign-up";

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
