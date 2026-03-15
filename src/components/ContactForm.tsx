'use client';

import { useState } from 'react';
import Button from './Button';
import { CheckCircle, Loader2 } from 'lucide-react';

interface FormState {
    name: string;
    email: string;
    phone: string;
    facilityType: string;
    message: string;
}

export default function ContactForm() {
    const CONTACT_EMAIL = 'info@auzcleanfacility.com.au';
    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        facilityType: '',
        message: '',
    });
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const errs: Partial<FormState> = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = 'Valid email is required';
        if (!form.phone.trim()) errs.phone = 'Phone number is required';
        if (!form.facilityType) errs.facilityType = 'Please select a facility type';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        const subject = `New Quote Request - ${form.facilityType}`;
        const bodyLines = [
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            `Phone: ${form.phone}`,
            `Facility Type: ${form.facilityType}`,
            '',
            'Message:',
            form.message?.trim() || 'N/A',
        ];
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            bodyLines.join('\n')
        )}`;

        window.location.href = mailtoLink;
        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Thank You!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
                    Your inquiry has been received. Our team will contact you within 24
                    hours with a tailored cleaning solution.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Full Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-slate-200'
                            } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all`}
                        placeholder="John Smith"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Phone *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-slate-200'
                            } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all`}
                        placeholder="0400 000 000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address *
                </label>
                <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-slate-200'
                        } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all`}
                    placeholder="john@company.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="facilityType" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Facility Type *
                </label>
                <select
                    id="facilityType"
                    value={form.facilityType}
                    onChange={(e) => setForm({ ...form, facilityType: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.facilityType ? 'border-red-400' : 'border-slate-200'
                        } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all`}
                >
                    <option value="">Select facility type...</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Healthcare Facility">Healthcare Facility</option>
                    <option value="Industrial / Warehouse">Industrial / Warehouse</option>
                    <option value="Education / Childcare">Education / Childcare</option>
                    <option value="Retail / Hospitality">Retail / Hospitality</option>
                    <option value="Transport / Fleet">Transport / Fleet</option>
                    <option value="Other">Other</option>
                </select>
                {errors.facilityType && (
                    <p className="text-red-500 text-xs mt-1">{errors.facilityType}</p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message (Optional)
                </label>
                <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-royal/20 focus:border-royal transition-all resize-none"
                    placeholder="Tell us about your cleaning needs, facility size, and any specific requirements..."
                />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                    </>
                ) : (
                    'Request a Free Quote'
                )}
            </Button>

            <p className="text-xs text-slate-400 text-center">
                We&apos;ll respond within 24 hours. No spam, ever.
            </p>

            <p className="text-xs text-slate-500 text-center">
                Prefer direct email? Write to{' '}
                <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium text-royal hover:underline"
                >
                    {CONTACT_EMAIL}
                </a>
                .
            </p>
        </form>
    );
}
