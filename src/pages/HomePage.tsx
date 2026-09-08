import { About } from '@/components/sections/About';
import { Colophon } from '@/components/sections/Colophon';
import { Contact } from '@/components/sections/Contact';
import { Education } from '@/components/sections/Education';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Skills } from '@/components/sections/Skills';
import { Work } from '@/components/sections/Work';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Colophon />
      <Contact />
    </>
  );
}
