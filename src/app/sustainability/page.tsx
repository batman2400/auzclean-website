import { Metadata } from 'next';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import LeadGenCTA from '@/components/LeadGenCTA';
import { Droplets, Recycle, Globe, CheckCircle, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Sustainability',
    description:
        'Auzclean Services is committed to sustainable, eco-friendly cleaning. GECA certified products, water conservation, and waste reduction programs.',
};

export default function SustainabilityPage() {
    return (
        <>
            {/* Page header */}
            <section className="bg-gradient-to-br from-navy via-navy-light to-slate-900 py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/10 rounded-full blur-[120px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-3">
                            Our Commitment
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Sustainability
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Cleaning that cares for people and the planet. Our sustainable practices
                            protect your environment while preserving the natural one.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* GECA Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center mb-6">
                                <Award size={32} />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-6">
                                GECA Certified Products
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    We exclusively use Good Environmental Choice Australia (GECA) certified
                                    cleaning products. This independent certification verifies that our
                                    products meet strict environmental and health performance standards.
                                </p>
                                <p>
                                    GECA certified products are scientifically assessed for reduced
                                    environmental impact throughout their lifecycle — from raw materials
                                    to disposal — ensuring a genuine commitment to sustainability, not
                                    just greenwashing.
                                </p>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {[
                                    'Reduced volatile organic compounds (VOCs)',
                                    'Biodegradable formulations',
                                    'No harmful chemicals or carcinogens',
                                    'Reduced aquatic toxicity',
                                    'Sustainable packaging & sourcing',
                                ].map((item) => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                                        <CheckCircle size={18} className="text-emerald shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2} direction="left">
                            <div className="bg-gradient-to-br from-emerald/10 to-teal/5 rounded-3xl p-12 flex items-center justify-center aspect-square">
                                <Image
                                    src="/images/geca.png"
                                    alt="GECA Certified — Good Environmental Choice Australia"
                                    width={400}
                                    height={400}
                                    className="w-full max-w-[280px] h-auto object-contain"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="py-20 lg:py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                            Our Approach
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                            Sustainability Pillars
                        </h2>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Droplets,
                                title: 'Water Conservation',
                                description:
                                    'Advanced cleaning technologies that reduce water consumption by up to 60% compared to traditional methods.',
                                stats: '60% Less Water',
                            },
                            {
                                icon: Recycle,
                                title: 'Waste Reduction',
                                description:
                                    'Comprehensive waste management protocols including recycling programs and minimal single-use product usage.',
                                stats: 'Zero-Waste Goal',
                            },
                            {
                                icon: Globe,
                                title: 'Carbon Footprint',
                                description:
                                    'Route optimization, efficient equipment, and local sourcing to minimise our environmental impact.',
                                stats: 'Carbon Neutral Path',
                            },
                        ].map((pillar, i) => (
                            <AnimatedSection key={pillar.title} delay={i * 0.15}>
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 h-full text-center">
                                    <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                                        <pillar.icon size={28} />
                                    </div>
                                    <div className="text-sm font-bold text-emerald mb-2">{pillar.stats}</div>
                                    <h3 className="text-xl font-bold text-navy mb-3">{pillar.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            <LeadGenCTA />
        </>
    );
}
