import { useEffect } from 'react'
import { SelectedWork } from './SelectedWork.tsx'
import { About } from './About.tsx'
import { Experience } from './Experience.tsx'
import { Projects } from './Projects.tsx'
import { Services } from './Services.tsx'
import { Skills } from './Skills.tsx'
import { Education } from './Education.tsx'
import { Contact } from './Contact.tsx'
import { SECTIONS_READY } from '../lib/events.ts'

/** Everything after the hero, split into its own chunk so the hero paints sooner. */
export default function BelowFold() {
  useEffect(() => {
    window.dispatchEvent(new Event(SECTIONS_READY))
  }, [])

  return (
    <>
      <SelectedWork />
      <About />
      <Experience />
      <Projects />
      <Services />
      <Skills />
      <Education />
      <Contact />
    </>
  )
}
