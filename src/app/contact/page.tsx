import { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us',
    description:
        'Contact Auzclean Services for a free commercial cleaning quote. Phone: 1300 796 987. Email: info@auzcleanfacility.com.au. Level 19, 10 Eagle Street, Brisbane.',
};

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        value: '1300 796 987',
        href: 'tel:1300796987',
        detail: 'Mon – Fri, 7am – 6pm AEST',
    },
    {
        icon: Mail,
        title: 'Email',
        value: 'info@auzcleanfacility.com.au',
        href: 'mailto:info@auzcleanfacility.com.au',
        detail: 'Response within 24 hours',
    },
    {
        icon: MapPin,
        title: 'Office',
        value: 'Level 19, 10 Eagle Street',
        href: 'https://maps.google.com/?q=10+Eagle+Street+Brisbane',
        detail: 'Brisbane QLD, Australia',
    },
    {
        icon: Clock,
        title: 'Service Hours',
        value: '24/7 Service Available',
        href: undefined,
        detail: 'Emergency cleaning on call',
    },
];

export default function ContactPage() {
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
                            Get In Touch
                        </p>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                            Contact Us
                        </h1>
                        <p className="text-lg text-white/70 max-w-2xl mx-auto">
                            Ready to experience the Auzclean difference? Get in touch for a
                            free, no-obligation quote tailored to your facility.
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact cards + Form */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Contact info cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((item, i) => (
                            <AnimatedSection key={item.title} delay={i * 0.1}>
                                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-royal/20 transition-all duration-300 h-full">
                                    <div className="w-12 h-12 bg-royal/10 text-royal rounded-xl flex items-center justify-center mb-4">
                                        <item.icon size={22} />
                                    </div>
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                        {item.title}
                                    </h3>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-lg font-bold text-navy hover:text-royal transition-colors block mb-1"
                                            target={item.href.startsWith('http') ? '_blank' : undefined}
                                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <div className="text-lg font-bold text-navy mb-1">{item.value}</div>
                                    )}
                                    <p className="text-sm text-slate-500">{item.detail}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Form + Map */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <AnimatedSection>
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-10 shadow-sm">
                                <h2 className="text-2xl font-bold text-navy mb-2">
                                    Request a Free Quote
                                </h2>
                                <p className="text-slate-600 mb-8">
                                    Tell us about your facility and we&apos;ll prepare a tailored
                                    cleaning proposal.
                                </p>
                                <ContactForm />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="bg-slate-100 rounded-2xl overflow-hidden h-full min-h-[400px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.2845!2d153.029!3d-27.468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a07b2e11d15%3A0x6add69a3dd26cb92!2s10%20Eagle%20St%2C%20Brisbane%20City%20QLD%204000%2C%20Australia!5e0!3m2!1sen!2s!4v1709000000000!5m2!1sen!2s"
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Auzclean Services — 10 Eagle Street, Brisbane"
                                />
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
}
