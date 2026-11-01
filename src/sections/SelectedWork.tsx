import { ArrowUpRight } from 'lucide-react'
import { clientProjects } from '../data/projects.ts'
import { SectionHeading } from '../components/ui/SectionHeading.tsx'
import { ClientCase } from '../components/projects/ClientCase.tsx'
import { Button } from '../components/ui/Button.tsx'
import { Reveal } from '../components/animations/Reveal.tsx'

export function SelectedWork() {
  return (
    <section id="freelance" aria-labelledby="freelance-title" className="relative overflow-x-clip py-28 md:py-40">
      <div className="container-x">
        <SectionHeading
          id="freelance-title"
          index="01"
          eyebrow="Featured client work"
          title="Independent Web Development & Creative Digital Experiences"
          accent={['Creative', 'Digital', 'Experiences']}
          intro={
            <>
              Real websites I’ve designed and developed for businesses in Madhya Pradesh — an animation studio, a garden restaurant
              and a hotel. All three are live, so you can see exactly what I built.
            </>
          }
        />

        <div className="mt-20 space-y-32 md:mt-28 md:space-y-48">
          {clientProjects.map((project, i) => (
            <ClientCase key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-28 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-gradient-to-r from-violet/[0.08] via-transparent to-cyan/[0.06] p-8 md:mt-36 md:flex-row md:items-center md:p-10">
          <div>
            <p className="eyebrow">Your business next?</p>
            <p className="mt-2 max-w-xl font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
              I build websites for businesses that want to look as good online as they are in person.
            </p>
          </div>
          <Button href="#services" icon={<ArrowUpRight size={16} aria-hidden="true" />}>
            How I can help
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
