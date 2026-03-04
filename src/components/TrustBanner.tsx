'use client';

import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

const clients = [
    { name: 'Journey Early Learning', logo: '/images/clients/journey.jpg' },
    { name: 'South Brisbane District Cricket Club', logo: '/images/clients/club.webp' },
    { name: 'BM Property Services', logo: '/images/clients/bm.png' },
    { name: 'Bremer Medical Centre', logo: '/images/clients/bremer.png' },
    { name: 'Kuraby Mosque', logo: '/images/clients/kuraby.webp' },
    { name: 'Richard Crookes Constructions', logo: '/images/clients/richard.jpeg' },
    { name: 'ServiceFM', logo: '/images/clients/servicefm.jpg' },
    { name: 'West Moreton Health', logo: '/images/clients/westmoreton.webp' },
];

export default function TrustBanner() {
    return (
        <section className="py-14 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection>
                    <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-wider mb-10">
                        Trusted by leading organisations across Queensland
                    </p>
                </AnimatedSection>
                <AnimatedSection delay={0.15}>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                        {clients.map((client) => (
                            <div
                                key={client.name}
                                className="group flex items-center justify-center bg-white rounded-xl border border-slate-200 px-5 py-4 hover:border-royal/20 hover:shadow-lg hover:shadow-royal/5 transition-all duration-300"
                                style={{ width: '160px', height: '80px' }}
                            >
                                <Image
                                    src={client.logo}
                                    alt={client.name}
                                    width={140}
                                    height={60}
                                    className="max-h-[50px] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                />
                            </div>
                        ))}
                        {/* CM3 Badge */}
                        <div className="flex items-center justify-center bg-emerald/5 rounded-xl border border-emerald/20 px-5 py-4 hover:shadow-lg hover:shadow-emerald/5 transition-all duration-300 gap-3"
                            style={{ height: '80px' }}
                        >
                            <Image
                                src="/images/cm3.svg"
                                alt="CM3 Compliant"
                                width={80}
                                height={36}
                                className="h-9 w-auto"
                            />
                            <span className="text-sm font-bold text-emerald">Compliant</span>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
