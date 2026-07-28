import { Bot, Code2, LayoutPanelTop, Sparkles } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const strengths = [
  {
    icon: LayoutPanelTop,
    title: 'UI/UX',
    description: 'Readable layouts, careful spacing, and simple interaction states.',
  },
  {
    icon: Code2,
    title: 'Engineering',
    description: 'APIs, dashboards, auth flows, and maintainable full-stack code.',
  },
  {
    icon: Bot,
    title: 'Automation',
    description: 'Practical AI and workflow ideas turned into useful tools.',
  },
  {
    icon: Sparkles,
    title: 'Polish',
    description: 'Consistency, performance, and product details that feel finished.',
  },
];

const focusAreas = [
  'Agentic workflows',
  'Edge & serverless',
  'Design systems',
  'Performance tuning',
];

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm text-secondary">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

export default function About() {
  return (
    <section data-section="about" className="sleek-section">
      <SectionHeading subHeading="About" heading="Me" />

      <div className="mt-8">
        <p className="mt-4 max-w-2xl text-base leading-8 text-secondary sm:text-lg">
          I started out writing small scripts to automate boring tasks, and that
          curiosity grew into shipping full products end to end. I care about the
          parts that are easy to skip onboarding flows, empty states, error
          messages that actually help as much as the architecture underneath.
        </p>

        <p className="mt-8 font-bold text-secondary">Currently exploring</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span key={area} className="sleek-chip px-2 py-1 text-sm font-bold">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {strengths.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="sleek-card p-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <span className="sleek-chip flex h-9 w-9 items-center justify-center">
                  <Icon size={17} />
                </span>
                <h3 className="font-bold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-secondary">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}