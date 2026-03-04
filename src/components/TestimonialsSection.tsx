'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'Facilities Manager',
        company: 'Brisbane Office Group',
        rating: 5,
        text: "Auzclean transformed our office environment. Their team is punctual, thorough, and incredibly professional. We've seen a noticeable improvement in staff satisfaction since they took over our cleaning contract.",
    },
    {
        name: 'James Chen',
        role: 'Operations Director',
        company: 'Queensland Health Partners',
        rating: 5,
        text: "In healthcare, cleaning isn't just about appearances — it's about safety. Auzclean understands this completely. Their infection control protocols are excellent, and their team consistently exceeds our standards.",
    },
    {
        name: 'Rebecca Holmes',
        role: 'Centre Director',
        company: 'Journey Early Learning',
        rating: 5,
        text: "Finding a cleaning company that uses child-safe, eco-friendly products was essential for us. Auzclean delivers spotless results every time, and we have complete peace of mind knowing our little ones are in a safe environment.",
    },
    {
        name: 'David Kowalski',
        role: 'Warehouse Manager',
        company: 'Metro Commercial Group',
        rating: 5,
        text: "Our 5,000sqm warehouse requires heavy-duty cleaning that most companies can't handle. Auzclean brought the right equipment, the right team, and delivered beyond expectations. Their 12-month fixed pricing is a bonus.",
    },
    {
        name: 'Amanda Nguyen',
        role: 'Principal',
        company: 'Coastal Education Network',
        rating: 5,
        text: "We've worked with Auzclean for over three years now. Their consistency is remarkable — every morning our classrooms are spotless. The team is friendly, responsive, and genuinely cares about our school community.",
    },
    {
        name: 'Mark Sullivan',
        role: 'Fleet Operations Lead',
        company: 'Brisbane Transit Authority',
        rating: 5,
        text: "Keeping a public transit fleet clean is a massive undertaking. Auzclean handles it with professionalism and efficiency. Their depot cleaning service is second to none, and scheduling around our operations is seamless.",
    },
];

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
    const next = () =>
        setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

    // Show 3 at a time on desktop, 1 on mobile
    const getVisibleTestimonials = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(testimonials[(current + i) % testimonials.length]);
        }
        return visible;
    };

    return (
        <section className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                        Client Testimonials
                    </p>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it — hear from the businesses that
                        trust us with their facilities every day.
                    </p>
                </AnimatedSection>

                {/* Desktop carousel (3 cards) */}
                <div className="hidden md:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="grid grid-cols-3 gap-6"
                        >
                            {getVisibleTestimonials().map((t) => (
                                <TestimonialCard key={t.name} testimonial={t} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile carousel (1 card) */}
                <div className="md:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <TestimonialCard testimonial={testimonials[current]} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-10">
                    <button
                        onClick={prev}
                        className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-royal hover:border-royal/30 hover:shadow-lg transition-all"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
                                        ? 'bg-royal w-7'
                                        : 'bg-slate-300 hover:bg-slate-400'
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-royal hover:border-royal/30 hover:shadow-lg transition-all"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({
    testimonial,
}: {
    testimonial: (typeof testimonials)[number];
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-7 h-full flex flex-col hover:shadow-lg hover:border-royal/10 transition-all duration-300">
            {/* Quote icon */}
            <div className="w-10 h-10 bg-royal/5 rounded-lg flex items-center justify-center mb-5">
                <Quote size={18} className="text-royal" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className="text-amber-400 fill-amber-400"
                    />
                ))}
            </div>

            {/* Text */}
            <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-6">
                &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-br from-royal to-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                </div>
                <div>
                    <div className="text-sm font-semibold text-navy">
                        {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500">
                        {testimonial.role}, {testimonial.company}
                    </div>
                </div>
            </div>
        </div>
    );
}
