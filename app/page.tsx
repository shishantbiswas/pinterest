"use client";
import { Container, Main, Section } from "@/components/craft";
import Feature from "@/components/pages/home/feature-left";
import FeatureTile from "@/components/pages/home/feature-tile";
import Hero from "@/components/pages/home/hero-section";

export default function Home() {
  return (
    <Main>
      <Section>
        <Container>
          <Hero />
          <Feature />
          <FeatureTile />
        </Container>
      </Section>
    </Main>
  );
}
