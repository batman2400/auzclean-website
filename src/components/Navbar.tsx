'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import Button from './Button';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Top contact bar */}
            <div className="bg-navy text-white/80 text-sm hidden md:block">
                <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <a href="tel:1300796987" className="flex items-center gap-1.5 hover:text-cyan transition-colors">
                            <Phone size={13} /> 1300 796 987
                        </a>
                        <a href="mailto:info@auzcleanfacility.com.au" className="hover:text-cyan transition-colors">
                            info@auzcleanfacility.com.au
                        </a>
                    </div>
                    <span className="text-white/50">Level 19, 10 Eagle Street, Brisbane QLD</span>
                </div>
            </div>

            {/* Main navbar */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy/5'
                    : 'bg-white'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/images/logo.png"
                            alt="Auzclean Services"
                            width={280}
                            height={84}
                            className="h-20 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === link.href
                                    ? 'text-royal bg-royal/5'
                                    : 'text-slate-600 hover:text-royal hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a
                            href="tel:1300796987"
                            className="flex items-center gap-2 text-sm font-semibold text-navy hover:text-royal transition-colors"
                        >
                            <Phone size={16} />
                            1300 796 987
                        </a>
                        <Button href="/contact" size="sm">
                            Get a Quote
                        </Button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 text-navy hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-1 animate-in slide-in-from-top duration-200">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                    ? 'text-royal bg-royal/5'
                                    : 'text-slate-600 hover:text-royal hover:bg-slate-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-3 border-t border-slate-100 space-y-3">
                            <a
                                href="tel:1300796987"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-navy"
                            >
                                <Phone size={16} />
                                1300 796 987
                            </a>
                            <Button href="/contact" className="w-full">
                                Get a Quote
                            </Button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
