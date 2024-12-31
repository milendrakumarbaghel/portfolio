import { PageTitle } from '../components/Layout/PageTitle';
import { ServiceCard } from '../components/Cards/ServiceCard';
import { Monitor, Smartphone, Gamepad } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "High-quality development of sites at the professional level."
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Professional development of applications for iOS and Android."
  },
  {
    icon: Gamepad,
    title: "Gaming",
    description: "I used to play Battle Royal PC and Mobile Games."
  }
];

export const About = () => {
  return (
    <article>
      <PageTitle>About me</PageTitle>

      <section className="text-gray-300 mb-12 space-y-4">
        <p>
          I am Milendra Kumar Baghel, a dedicated and passionate software developer currently pursuing a Master of Computer Applications (MCA) at Maulana Azad National Institute of Technology, Bhopal.
        </p>
        <p>
          With a strong foundation in programming languages like Java, Python, and JavaScript, along with experience in databases such as MySQL and MongoDB, I bring a versatile skill set to both frontend and backend development.
        </p>
      </section>

      <section>
        <h3 className="text-2xl text-white font-medium mb-6">What I'm doing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </article>
  );
};
