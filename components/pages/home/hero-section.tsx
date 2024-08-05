import Link from "next/link";

import Balancer from "react-wrap-balancer";
import { ArrowRight } from "lucide-react";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <Section>
      <Container>
        <div>
          <Button
            asChild
            className="mb-6 w-fit"
            size={"sm"}
            variant={"outline"}
          >
          </Button>
          <h1>
            <Balancer>
              Just another Pinterest Clone, with Next JS, Tailwindcss, Pocketbase and this little library I found called Craft.
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              why ?, because I can and learning Rust or Flutter is hard <br/>
              here&apos;s a lovely error to cheer you up
            </Balancer>
          </h3>
          <div className="not-prose my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <img
              className="h-full w-full object-cover object-bottom"
              alt="placeholder"
              src={
                "https://user-images.githubusercontent.com/62936624/209355552-0ef6b781-721a-490d-8762-0ca48157074a.png"
              }
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
