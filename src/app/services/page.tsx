import { Metadata } from 'next';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import LeadGenCTA from '@/components/LeadGenCTA';
import {
    Building2,
    HeartPulse,
    Factory,
    GraduationCap,
    FlaskConical,
    Bus,
    Sparkles,
    CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Our Services',
    description:
        'Comprehensive commercial cleaning services including healthcare, industrial, education, GMP, transport, and specialized cleaning across Brisbane & QLD.',
};

const services = [
    {
        id: 'commercial',
        icon: Building2,
        title: 'Commercial Cleaning',
        subtitle: 'Offices & Corporate Spaces',
        description:
            'Maintain a professional, healthy workspace that boosts productivity and impresses clients. Our commercial cleaning programs are tailored to your business hours, building layout, and specific requirements.',
        features: [
            'Daily, weekly, or fortnightly scheduling',
            'Common areas, workstations & meeting rooms',
            'Kitchen & amenity block sanitisation',
            'Waste management & recycling programs',
            'After-hours & weekend cleaning available',
        ],
        gradient: 'from-royal/10 to-royal/5',
        iconColor: 'text-royal bg-royal/10',
        image: '/images/services/commercial.jpg',
    },
    {
        id: 'healthcare',
        icon: HeartPulse,
        title: 'Healthcare Cleaning',
        subtitle: 'Hospitals, Clinics & Aged Care',
        description:
            'Rigorous infection control cleaning that meets Australian healthcare standards. Our team is trained in HIC protocols and uses hospital-grade disinfectants to protect patients and staff.',
        features: [
            'Infection control compliant procedures',
            'Terminal & discharge cleaning',
            'Operating theatre & sterile area cleaning',
            'Aged care facility maintenance',
            'Biohazard waste management',
        ],
        gradient: 'from-teal/10 to-teal/5',
        iconColor: 'text-teal bg-teal/10',
        image: '/images/services/healthcare.jpg',
    },
    {
        id: 'industrial',
        icon: Factory,
        title: 'Industrial Cleaning',
        subtitle: 'Warehouses & Manufacturing',
        description:
            'Heavy-duty cleaning solutions for industrial environments. We handle high-ceilings, machinery areas, loading docks, and facilities of any scale with specialised equipment.',
        features: [
            'High-pressure washing & scrubbing',
            'Factory floor degreasing',
            'Warehouse & storage area cleaning',
            'Loading dock & yard maintenance',
            'Height access & confined space cleaning',
        ],
        gradient: 'from-navy/10 to-navy/5',
        iconColor: 'text-navy bg-navy/10',
        image: '/images/services/industrial.jpg',
    },
    {
        id: 'education',
        icon: GraduationCap,
        title: 'Education Cleaning',
        subtitle: 'Schools, Childcare & Universities',
        description:
            'Creating safe, hygienic learning environments for students and educators. We use child-safe, eco-friendly products and work around academic schedules.',
        features: [
            'Classroom & laboratory cleaning',
            'Playground & outdoor area maintenance',
            'Child-safe, non-toxic cleaning products',
            'Term-time & school holiday deep cleans',
            'Childcare centre specialised cleaning',
        ],
        gradient: 'from-emerald/10 to-emerald/5',
        iconColor: 'text-emerald bg-emerald/10',
        image: '/images/services/education.jpg',
    },
    {
        id: 'gmp',
        icon: FlaskConical,
        title: 'GMP Cleaning',
        subtitle: 'Pharmaceutical & Food Production',
        description:
            'Good Manufacturing Practice compliant cleaning for regulated environments. Our protocols meet strict industry standards for pharmaceutical, food production, and cleanroom facilities.',
        features: [
            'Cleanroom & controlled environment cleaning',
            'GMP documentation & audit trails',
            'Pharmaceutical facility maintenance',
            'Food production area sanitisation',
            'Regulatory compliance support',
        ],
        gradient: 'from-teal/10 to-teal/5',
        iconColor: 'text-teal bg-teal/10',
        image: '/images/services/gmp.jpg',
    },
    {
        id: 'transport',
        icon: Bus,
        title: 'Transport Cleaning',
        subtitle: 'Fleet, Depot & Public Transport',
        description:
            'Keep your transport fleet and facilities in pristine condition. From bus depots to rail yards, we deliver thorough cleaning that meets public health standards.',
        features: [
            'Bus, train & ferry interior cleaning',
            'Depot & maintenance facility cleaning',
            'Fleet vehicle exterior washing',
            'Station & terminal sanitisation',
            'Biohazard & graffiti removal',
        ],
        gradient: 'from-royal/10 to-royal/5',
        iconColor: 'text-royal bg-royal/10',
        image: '/images/services/transport.jpg',
    },
    {
        id: 'specialized',
        icon: Sparkles,
        title: 'Specialized Cleaning',
        subtitle: 'Carpet, Window & Specialist Services',
        description:
            'Expert specialist cleaning services for specific needs. Whether it\'s post-construction cleanup, high-pressure external washing, or delicate carpet care — we have you covered.',
        features: [
            'Carpet steam cleaning & stain removal',
            'Window cleaning (internal & external)',
            'High-pressure external washing',
            'Post-construction & renovation cleanup',
            'Event setup & pack-down cleaning',
        ],
        gradient: 'from-navy/10 to-navy/5',
        iconColor: 'text-navy bg-navy/10',
        image: '/images/services/specialized.jpg',
    },
];

export default function ServicesPage() {
    return (
        <>
            {/* Page header */}
            <section className="bg-gradient-to-br from-navy via-navy-light to-slate-900 py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/10 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-3">
                            What We Do
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Our Cleaning Services
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Comprehensive, technology-driven cleaning solutions for every
                            industry across Brisbane &amp; Queensland.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Services list */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6 space-y-16">
                    {services.map((service, i) => (
                        <AnimatedSection key={service.id} delay={0.1}>
                            <div
                                id={service.id}
                                className="scroll-mt-24 grid lg:grid-cols-2 gap-10 items-center"
                            >
                                {/* Content */}
                                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div
                                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.iconColor}`}
                                    >
                                        <service.icon size={32} />
                                    </div>
                                    <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-2">
                                        {service.subtitle}
                                    </p>
                                    <h2 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
                                        {service.title}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-3 text-sm text-slate-600"
                                            >
                                                <CheckCircle
                                                    size={18}
                                                    className="text-emerald shrink-0 mt-0.5"
                                                />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Service image */}
                                <div
                                    className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? 'lg:order-1' : ''
                                        }`}
                                >
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>

            <LeadGenCTA />
        </>
    );
}
