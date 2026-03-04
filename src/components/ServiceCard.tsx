import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: string;
}

export default function ServiceCard({
    title,
    description,
    icon: Icon,
    href,
    color = 'royal',
}: ServiceCardProps) {
    const colorClasses: Record<string, { bg: string; iconBg: string; hover: string }> = {
        royal: {
            bg: 'group-hover:border-royal/20',
            iconBg: 'bg-royal/10 text-royal group-hover:bg-royal group-hover:text-white',
            hover: 'text-royal',
        },
        teal: {
            bg: 'group-hover:border-teal/20',
            iconBg: 'bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white',
            hover: 'text-teal',
        },
        navy: {
            bg: 'group-hover:border-navy/20',
            iconBg: 'bg-navy/10 text-navy group-hover:bg-navy group-hover:text-white',
            hover: 'text-navy',
        },
        emerald: {
            bg: 'group-hover:border-emerald/20',
            iconBg: 'bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-white',
            hover: 'text-emerald',
        },
    };

    const styles = colorClasses[color] || colorClasses.royal;

    return (
        <Link href={href} className="group block">
            <div
                className={`bg-white border border-slate-200 rounded-2xl p-7 h-full transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 ${styles.bg}`}
            >
                <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${styles.iconBg}`}
                >
                    <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {description}
                </p>
                <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold ${styles.hover} opacity-0 group-hover:opacity-100 transition-all duration-300`}
                >
                    Learn More <ArrowRight size={14} />
                </span>
            </div>
        </Link>
    );
}
