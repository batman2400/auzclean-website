import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        'bg-royal text-white hover:bg-royal-light shadow-lg shadow-royal/20 hover:shadow-xl hover:shadow-royal/30',
    secondary:
        'bg-teal text-white hover:bg-teal-light shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30',
    outline:
        'border-2 border-royal text-royal hover:bg-royal hover:text-white',
    ghost:
        'text-slate-600 hover:text-royal hover:bg-slate-100',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
}: ButtonProps) {
    const baseStyles =
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap';

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
