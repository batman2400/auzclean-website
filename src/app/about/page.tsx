import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import LeadGenCTA from '@/components/LeadGenCTA';
import { Users, Target, Award, Shield, Clock, Handshake } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Us',
    description:
        'Learn about Auzclean Services — 15+ years of professional commercial cleaning excellence in Brisbane & Queensland. CM3 compliant, GECA certified.',
};

const values = [
    {
        icon: Target,
        title: 'Purpose-Driven',
        description: 'Every decision we make is guided by our mission to create healthier, more productive environments.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'We never settle for "good enough." Continuous improvement is embedded in everything we do.',
    },
    {
        icon: Shield,
        title: 'Integrity',
        description: 'Honest pricing, transparent communication, and accountability at every level of our organisation.',
    },
    {
        icon: Handshake,
        title: 'Partnership',
        description: 'We build genuine relationships with our clients, becoming an extension of their team.',
    },
    {
        icon: Users,
        title: 'People First',
        description: 'Our people are our greatest asset. We invest in training, wellbeing, and career growth.',
    },
    {
        icon: Clock,
        title: 'Reliability',
        description: 'Consistent, dependable service delivery. We show up on time, every time, without exception.',
    },
];

export default function AboutPage() {
    return (
        <>
            {/* Page header */}
            <section className="bg-gradient-to-br from-navy via-navy-light to-slate-900 py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal/10 rounded-full blur-[120px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-3">
                            About Auzclean
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Our Story
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Over 15 years of delivering professional cleaning excellence
                            across Brisbane &amp; Queensland.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Story section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <AnimatedSection>
                            <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                                Established 2009
                            </p>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-6">
                                Built on Trust, Driven by Excellence
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed">
                                <p>
                                    Auzclean Services was founded with a simple but powerful belief: that
                                    every space deserves to be clean, safe, and welcoming. What began as
                                    a small operation in Brisbane has grown into one of Queensland&apos;s most
                                    trusted commercial cleaning providers.
                                </p>
                                <p>
                                    For over 15 years, we&apos;ve partnered with businesses across healthcare,
                                    education, industrial, and corporate sectors — delivering consistent,
                                    reliable cleaning programs that our clients can count on.
                                </p>
                                <p>
                                    Today, we maintain hundreds of active contracts across the state,
                                    powered by a team of trained professionals, cutting-edge technology,
                                    and an unwavering commitment to sustainability.
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2} direction="left">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '15+', label: 'Years Experience', bg: 'bg-royal/5 border-royal/10' },
                                    { value: '500+', label: 'Active Contracts', bg: 'bg-teal/5 border-teal/10' },
                                    { value: '99%', label: 'Client Retention', bg: 'bg-emerald/5 border-emerald/10' },
                                    { value: '24/7', label: 'Support Available', bg: 'bg-navy/5 border-navy/10' },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className={`${stat.bg} border rounded-2xl p-6 text-center`}
                                    >
                                        <div className="text-3xl font-extrabold text-navy mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-slate-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 lg:py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                            Our Values
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                            What We Stand For
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            These core values guide every interaction, every clean, and every
                            decision we make as a company.
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((val, i) => (
                            <AnimatedSection key={val.title} delay={i * 0.1}>
                                <div className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-lg hover:border-royal/20 transition-all duration-300 h-full">
                                    <div className="w-12 h-12 bg-royal/10 text-royal rounded-xl flex items-center justify-center mb-4">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-navy mb-2">{val.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {val.description}
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
