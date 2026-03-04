'use client';

import AnimatedSection from './AnimatedSection';
import { Users, Trophy, DollarSign, Leaf } from 'lucide-react';

const values = [
    {
        icon: Users,
        title: 'Professional Team',
        description:
            'Trained, vetted, and uniformed cleaning professionals delivering consistent quality across every site.',
        color: 'royal',
    },
    {
        icon: Trophy,
        title: 'Proven Track Record',
        description:
            '15+ years of excellence with a 99% client retention rate. We build lasting partnerships, not just contracts.',
        color: 'navy',
    },
    {
        icon: DollarSign,
        title: '12-Month Fixed Pricing',
        description:
            'Transparent, competitive pricing locked in for 12 months. No hidden fees, no surprise invoices.',
        color: 'teal',
    },
    {
        icon: Leaf,
        title: 'Eco-Friendly Products',
        description:
            'GECA certified products that protect your people and the planet. Sustainability is our standard, not an option.',
        color: 'emerald',
    },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    royal: {
        bg: 'bg-royal/5',
        icon: 'bg-royal/10 text-royal',
        border: 'hover:border-royal/20',
    },
    navy: {
        bg: 'bg-navy/5',
        icon: 'bg-navy/10 text-navy',
        border: 'hover:border-navy/20',
    },
    teal: {
        bg: 'bg-teal/5',
        icon: 'bg-teal/10 text-teal',
        border: 'hover:border-teal/20',
    },
    emerald: {
        bg: 'bg-emerald/5',
        icon: 'bg-emerald/10 text-emerald',
        border: 'hover:border-emerald/20',
    },
};

export default function WhyChooseUs() {
    return (
        <section className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                        Why Choose Us
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                        The Auzclean Difference
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        We don&apos;t just clean spaces — we create healthier, more productive
                        environments through innovation, reliability, and genuine care.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((item, i) => {
                        const c = colorMap[item.color];
                        return (
                            <AnimatedSection key={item.title} delay={i * 0.1}>
                                <div
                                    className={`${c.bg} border border-transparent ${c.border} rounded-2xl p-7 h-full transition-all duration-300 hover:shadow-lg`}
                                >
                                    <div
                                        className={`w-14 h-14 ${c.icon} rounded-xl flex items-center justify-center mb-5`}
                                    >
                                        <item.icon size={26} />
                                    </div>
                                    <h3 className="text-lg font-bold text-navy mb-3">{item.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
