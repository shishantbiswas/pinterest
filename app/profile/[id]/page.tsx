import { Container, Main, Section } from "@/components/craft";
import Profile from "@/components/profile/profile";

export default function ProfilePage({params}:{params:{id:string}}) {
  return (
    <Main>
      <Section>
        <Container>
           <Profile id={params.id} />
        </Container>
      </Section>
    </Main>
  );
}