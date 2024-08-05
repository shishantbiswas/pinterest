import Link from "next/link";

import * as Craft from "@/components/craft";
import { Button } from "@/components/ui/button";

import Placeholder from "@/public/placeholder.webp";

const Feature = () => {
    const placeholderUrl = Object.values(Placeholder)[0];

  return (
    <Craft.Section>
      <Craft.Container className="grid items-stretch md:grid-cols-2 md:gap-12">
        <div className="not-prose relative flex h-96 overflow-hidden rounded-lg border">
          <img
            src={placeholderUrl}
            alt="placeholder"
            className="size-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 py-8">
          <h3 className="!my-0">What&apos;s this ?</h3>
          <p className="font-light leading-[1.4] opacity-70">
            A pretentious placeholder image placed specifically to catch your attention and then sell you my cyrpto scam.
          </p>
          <div className="not-prose flex items-center gap-2">
            <Button className="w-fit" asChild>
              <Link href="https://github.com/brijr/craft">Get Started</Link>
            </Button>
            <Button className="w-fit" variant="link" asChild>
              <Link href="https://components.bridger.to/">Learn More {"->"}</Link>
            </Button>
          </div>
        </div>
      </Craft.Container>
    </Craft.Section>
  );
};

export default Feature;
