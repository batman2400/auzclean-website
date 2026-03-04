'use client';

import AnimatedSection from './AnimatedSection';
import Button from './Button';
import { ArrowRight, Phone } from 'lucide-react';

export default function LeadGenCTA() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy via-royal to-navy-light relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/10 rounded-full blur-[150px]" />
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <AnimatedSection>
                    <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-4">
                        Ready to Get Started?
                    </p>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Book Your Free Consultation Today
                    </h2>
                    <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                        Join hundreds of Queensland businesses who trust Auzclean for their
                        commercial cleaning needs. No obligations, just a conversation
                        about how we can help.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            href="/contact"
                            variant="secondary"
                            size="lg"
                        >
                            Request a Quote <ArrowRight size={18} />
                        </Button>
                        <Button
                            href="tel:1300796987"
                            variant="outline"
                            size="lg"
                            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                        >
                            <Phone size={18} /> Call 1300 796 987
                        </Button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
