import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { Chip, Container, Eyebrow, SplitHeading } from "./primitives";
import FloatingCircles from "./FloatingCircles";
import SphereField from "@/components/float/SphereField";

type Props = { eyebrow: string; l1: string; l2?: string; desc?: string; chips?: string[]; image?: string; imageAlt?: string; children?: ReactNode; aside?: ReactNode; imageClassName?: string };

/** Calm inner-page hero: blurred/pastel background, masked headline, soft fade-ins. */
export default function PageHero({ eyebrow, l1, l2, desc, chips, image, imageAlt = "", children, aside, imageClassName = "object-[75%_center]" }: Props) {
  return (
    <Reveal aria-labelledby="page-title" className="wash-hero relative overflow-hidden">
      {image ? (
        <div aria-hidden={!imageAlt} className="absolute inset-0">
          <div data-parallax="10" className="absolute -inset-y-[6%] inset-x-0">
            <Image src={image} alt={imageAlt} fill priority sizes="100vw" className={`object-cover ${imageClassName}`} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white md:bg-gradient-to-r md:from-white md:via-white/80 md:to-white/10" />
        </div>
      ) : (
        <FloatingCircles className="opacity-80" />
      )}
      <SphereField preset={image ? "c" : "a"} />
      {aside}
      <Container className="relative pb-20 pt-24 sm:pb-28 sm:pt-32">
        <div className={aside ? "max-w-3xl md:max-w-[46vw] xl:max-w-[40rem]" : "max-w-3xl"}>
          <div data-fade><Eyebrow>{eyebrow}</Eyebrow></div>
          <SplitHeading id="page-title" as="h1" size="xl" l1={l1} l2={l2} className="mt-5" />
          {desc ? <p data-fade="0.2" className="mt-7 max-w-2xl text-lg leading-relaxed text-slate">{desc}</p> : null}
          {chips?.length ? <div data-fade="0.35" className="mt-8 flex flex-wrap gap-3">{chips.map((c) => <Chip key={c}>{c}</Chip>)}</div> : null}
          {children}
        </div>
      </Container>
    </Reveal>
  );
}
