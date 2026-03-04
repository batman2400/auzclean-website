import HeroSection from '@/components/HeroSection';
import TrustBanner from '@/components/TrustBanner';
import WhyChooseUs from '@/components/WhyChooseUs';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProcessTimeline from '@/components/ProcessTimeline';
import LeadGenCTA from '@/components/LeadGenCTA';
import AnimatedSection from '@/components/AnimatedSection';
import ServiceCard from '@/components/ServiceCard';
import {
  Building2,
  HeartPulse,
  Factory,
  GraduationCap,
  FlaskConical,
  Bus,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    title: 'Commercial Cleaning',
    description:
      'Offices, retail spaces, and corporate environments maintained to the highest standard with flexible scheduling.',
    icon: Building2,
    href: '/services#commercial',
    color: 'royal',
  },
  {
    title: 'Healthcare Cleaning',
    description:
      'Infection control and sterile environment cleaning for hospitals, clinics, and aged care facilities.',
    icon: HeartPulse,
    href: '/services#healthcare',
    color: 'teal',
  },
  {
    title: 'Industrial Cleaning',
    description:
      'Heavy-duty cleaning for warehouses, manufacturing plants, and industrial facilities of any scale.',
    icon: Factory,
    href: '/services#industrial',
    color: 'navy',
  },
  {
    title: 'Education Cleaning',
    description:
      'Safe, hygienic learning environments for schools, childcare centres, and universities.',
    icon: GraduationCap,
    href: '/services#education',
    color: 'emerald',
  },
  {
    title: 'GMP Cleaning',
    description:
      'Good Manufacturing Practice compliant cleaning for pharmaceutical and food production facilities.',
    icon: FlaskConical,
    href: '/services#gmp',
    color: 'teal',
  },
  {
    title: 'Transport Cleaning',
    description:
      'Fleet, depot, and public transport cleaning to maintain safety and presentation standards.',
    icon: Bus,
    href: '/services#transport',
    color: 'royal',
  },
  {
    title: 'Specialized Cleaning',
    description:
      'Carpet cleaning, window cleaning, high-pressure washing, and post-construction cleanups.',
    icon: Sparkles,
    href: '/services#specialized',
    color: 'navy',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Trust Banner */}
      <TrustBanner />

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
              Our Services
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
              Comprehensive Cleaning Solutions
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              From corporate offices to healthcare facilities, we deliver
              tailored cleaning programs that meet the unique demands of every
              industry.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Lead Gen CTA */}
      <LeadGenCTA />
    </>
  );
}
