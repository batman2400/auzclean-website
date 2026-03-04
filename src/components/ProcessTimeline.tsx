'use client';

import AnimatedSection from './AnimatedSection';
import { Search, ClipboardList, Sparkles, BarChart3 } from 'lucide-react';

const steps = [
    {
        step: '01',
        icon: Search,
        title: 'Consultation',
        description:
            'We assess your facility, understand your requirements, and identify the optimal cleaning strategy.',
    },
    {
        step: '02',
        icon: ClipboardList,
        title: 'Preparation',
        description:
            'A tailored cleaning plan is created with clear scope, scheduling, and transparent pricing.',
    },
    {
        step: '03',
        icon: Sparkles,
        title: 'Implementation',
        description:
            'Our trained professionals execute the plan using eco-friendly products and proven methods.',
    },
    {
        step: '04',
        icon: BarChart3,
        title: 'Evaluation',
        description:
            'Ongoing quality inspections and feedback loops ensure continuous improvement and satisfaction.',
    },
];

export default function ProcessTimeline() {
    return (
        <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                        Our Process
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                        How We Deliver Excellence
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        A proven four-step approach that ensures consistent, high-quality
                        results for every client.
                    </p>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden lg:block absolute top-12 left-[12.5%] w-[75%] h-0.5 bg-gradient-to-r from-royal via-teal to-emerald" />

                    {steps.map((item, i) => (
                        <AnimatedSection key={item.step} delay={i * 0.15}>
                            <div className="relative text-center">
                                {/* Step circle */}
                                <div className="w-24 h-24 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-royal to-teal rounded-full opacity-10" />
                                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <item.icon size={32} className="text-royal" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-8 h-8 bg-navy text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
