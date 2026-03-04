'use client';

import AnimatedSection from './AnimatedSection';
import Button from './Button';
import { ArrowRight, Phone, Shield, Clock, Leaf } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative bg-gradient-to-br from-navy via-navy-light to-slate-900 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-royal/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/10 rounded-full blur-[100px]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div>
                        <AnimatedSection delay={0}>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-cyan text-sm font-medium px-4 py-2 rounded-full mb-8">
                                <Shield size={14} />
                                CM3 Compliant &middot; GECA Certified
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                                Life Feels Better{' '}
                                <span className="bg-gradient-to-r from-cyan to-teal-light bg-clip-text text-transparent">
                                    Clean.
                                </span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <p className="text-lg text-white/70 leading-relaxed max-w-xl mb-8">
                                Professional commercial cleaning services driven by technology
                                and sustainability. Over 15 years serving Brisbane &amp;
                                Queensland with reliable, eco-friendly solutions.
                            </p>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3}>
                            <div className="flex flex-wrap gap-4">
                                <Button href="/contact" size="lg">
                                    Request a Quote <ArrowRight size={18} />
                                </Button>
                                <Button href="tel:1300796987" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                                    <Phone size={18} /> Call 1300 796 987
                                </Button>
                            </div>
                        </AnimatedSection>

                        {/* Quick stats */}
                        <AnimatedSection delay={0.4}>
                            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
                                {[
                                    { value: '15+', label: 'Years Experience' },
                                    { value: '500+', label: 'Active Contracts' },
                                    { value: '99%', label: 'Client Retention' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="text-3xl font-extrabold text-cyan">{stat.value}</div>
                                        <div className="text-sm text-white/50">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Right side — Feature cards */}
                    <AnimatedSection delay={0.3} direction="left" className="hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: Shield,
                                    title: 'CM3 Compliant',
                                    desc: 'Meeting the highest safety & compliance standards',
                                    gradient: 'from-royal/20 to-royal/5',
                                },
                                {
                                    icon: Clock,
                                    title: '12-Month Fixed',
                                    desc: 'Transparent pricing with no hidden surprises',
                                    gradient: 'from-teal/20 to-teal/5',
                                },
                                {
                                    icon: Leaf,
                                    title: 'GECA Certified',
                                    desc: 'Eco-friendly products gentle on the environment',
                                    gradient: 'from-emerald/20 to-emerald/5',
                                },
                                {
                                    icon: ArrowRight,
                                    title: 'Tech-Driven',
                                    desc: 'Smart scheduling & quality monitoring systems',
                                    gradient: 'from-cyan/20 to-cyan/5',
                                },
                            ].map(({ icon: FeatureIcon, title, desc, gradient }) => (
                                <div
                                    key={title}
                                    className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all duration-300`}
                                >
                                    <FeatureIcon size={24} className="text-cyan mb-3" />
                                    <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                                    <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
