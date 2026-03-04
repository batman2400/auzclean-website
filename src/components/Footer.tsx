import Link from 'next/link';
import Image from 'next/image';
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Linkedin,
    ArrowUpRight,
} from 'lucide-react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Contact', href: '/contact' },
];

const services = [
    { label: 'Commercial Cleaning', href: '/services#commercial' },
    { label: 'Healthcare Cleaning', href: '/services#healthcare' },
    { label: 'Industrial Cleaning', href: '/services#industrial' },
    { label: 'Education Cleaning', href: '/services#education' },
    { label: 'Transport Cleaning', href: '/services#transport' },
    { label: 'Specialized Cleaning', href: '/services#specialized' },
];

export default function Footer() {
    return (
        <footer className="bg-navy text-white">
            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <div className="bg-white rounded-xl px-4 py-2 inline-block">
                                <Image
                                    src="/images/logo.jpeg"
                                    alt="Auzclean Services"
                                    width={180}
                                    height={54}
                                    className="h-10 w-auto object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Professional commercial cleaning services driven by technology,
                            sustainability, and an unwavering commitment to excellence.
                        </p>
                        {/* CM3 badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                            <Image
                                src="/images/cm3.svg"
                                alt="CM3 Compliant"
                                width={60}
                                height={28}
                                className="h-7 w-auto brightness-0 invert"
                            />
                            <span className="text-xs text-white/70">Compliant</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-cyan text-sm transition-colors flex items-center gap-1 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
                            Our Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-cyan text-sm transition-colors flex items-center gap-1 group"
                                    >
                                        {link.label}
                                        <ArrowUpRight
                                            size={12}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:1300796987"
                                    className="flex items-start gap-3 text-white/60 hover:text-cyan transition-colors group"
                                >
                                    <Phone size={16} className="mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-sm font-medium text-white/80">1300 796 987</div>
                                        <div className="text-xs text-white/40">Mon – Fri, 7am – 6pm</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@auzcleanfacility.com.au"
                                    className="flex items-start gap-3 text-white/60 hover:text-cyan transition-colors"
                                >
                                    <Mail size={16} className="mt-0.5 shrink-0" />
                                    <span className="text-sm">info@auzcleanfacility.com.au</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-white/60">
                                <MapPin size={16} className="mt-0.5 shrink-0" />
                                <span className="text-sm">
                                    Level 19, 10 Eagle Street,
                                    <br />
                                    Brisbane QLD, Australia
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} Auzclean Services. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=100064058132330"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan transition-all"
                            aria-label="Facebook"
                        >
                            <Facebook size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/auzcleanservices/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-cyan transition-all"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
