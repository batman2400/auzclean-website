'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import LeadGenCTA from '@/components/LeadGenCTA';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const galleryImages = [
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.01.jpeg', alt: 'Auzclean cleaning project 1' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.05.jpeg', alt: 'Auzclean cleaning project 2' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.06.jpeg', alt: 'Auzclean cleaning project 3' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.08.jpeg', alt: 'Auzclean cleaning project 4' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.10.jpeg', alt: 'Auzclean cleaning project 5' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.11.jpeg', alt: 'Auzclean cleaning project 6' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.12.jpeg', alt: 'Auzclean cleaning project 7' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.13.jpeg', alt: 'Auzclean cleaning project 8' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.14.jpeg', alt: 'Auzclean cleaning project 9' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.15.jpeg', alt: 'Auzclean cleaning project 10' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.17.jpeg', alt: 'Auzclean cleaning project 11' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.18.jpeg', alt: 'Auzclean cleaning project 12' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.20.jpeg', alt: 'Auzclean cleaning project 13' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.21.jpeg', alt: 'Auzclean cleaning project 14' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.22.jpeg', alt: 'Auzclean cleaning project 15' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.24.jpeg', alt: 'Auzclean cleaning project 16' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.25.jpeg', alt: 'Auzclean cleaning project 17' },
    { src: '/Auzclean-gallery/photo_2026-03-09 08.15.26.jpeg', alt: 'Auzclean cleaning project 18' },
    { src: '/Auzclean-gallery/new1.jpeg', alt: 'Auzclean cleaning project 19' },
    { src: '/Auzclean-gallery/new 2.jpeg', alt: 'Auzclean cleaning project 20' },
    { src: '/Auzclean-gallery/new 3.jpeg', alt: 'Auzclean cleaning project 21' },
];

export default function GalleryPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }, [lightboxIndex]);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null) return;
        setLightboxIndex(
            (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
        );
    }, [lightboxIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxIndex, goNext, goPrev]);

    return (
        <>
            {/* Hero Header */}
            <section className="bg-gradient-to-br from-navy via-navy-light to-slate-900 py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-royal/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal/10 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <AnimatedSection>
                        <p className="text-sm font-semibold text-cyan uppercase tracking-wider mb-3">
                            Our Portfolio
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Our Work
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Browse through our completed projects and see the quality and care
                            we bring to every space we clean.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedSection className="text-center mb-16">
                        <p className="text-sm font-semibold text-teal uppercase tracking-wider mb-3">
                            Gallery
                        </p>
                        <h2 className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
                            Spaces We&apos;ve Transformed
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            From commercial offices to healthcare facilities, see the
                            difference professional cleaning makes.
                        </p>
                    </AnimatedSection>

                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {galleryImages.map((image, index) => (
                            <AnimatedSection key={image.src} delay={index * 0.04}>
                                <div
                                    className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer bg-slate-100"
                                    onClick={() => openLightbox(index)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View ${image.alt} in full screen`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            openLightbox(index);
                                        }
                                    }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <div className="flex items-center gap-2 text-white text-sm font-medium">
                                            <ZoomIn size={18} />
                                            <span>View Full Size</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Close lightbox"
                        >
                            <X size={24} />
                        </button>

                        {/* Previous button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className="relative max-w-[90vw] max-h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[lightboxIndex].src}
                                alt={galleryImages[lightboxIndex].alt}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                                priority
                            />
                            {/* Image counter */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
                                {lightboxIndex + 1} / {galleryImages.length}
                            </div>
                        </motion.div>

                        {/* Next button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <LeadGenCTA />
        </>
    );
}
