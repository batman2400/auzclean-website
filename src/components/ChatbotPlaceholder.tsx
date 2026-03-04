'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, FileText, HelpCircle, ArrowRight, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

const quickActions = [
    { label: 'Get a Free Quote', icon: FileText, action: 'quote' },
    { label: 'Our Services', icon: HelpCircle, action: 'services' },
    { label: 'Call Us Now', icon: Phone, action: 'call' },
];

const botResponses: Record<string, string> = {
    quote:
        "Great choice! You can request a free, no-obligation quote by visiting our Contact page, or call us directly at 1300 796 987. We'll tailor a cleaning solution to your specific needs.",
    services:
        "We offer 7 specialised cleaning services:\n\n• Commercial Cleaning\n• Healthcare Cleaning\n• Industrial Cleaning\n• Education Cleaning\n• GMP Cleaning\n• Transport Cleaning\n• Specialized Cleaning\n\nVisit our Services page to learn more about each one!",
    call:
        "You can reach us at 1300 796 987 during business hours (Mon–Fri, 7am–6pm). We'd love to chat about how we can help!",
    default:
        "Thanks for your message! For the fastest response, please call us at 1300 796 987 or submit a quote request on our Contact page. Our team typically responds within 2 business hours.",
};

export default function ChatbotPlaceholder() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "👋 Hi there! I'm the Auzclean assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing]);

    // Show unread dot after 4 seconds if chat hasn't been opened
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!open) setHasUnread(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, [open]);

    const addBotMessage = (text: string) => {
        setTyping(true);
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text, sender: 'bot', timestamp: new Date() },
            ]);
            setTyping(false);
        }, 800 + Math.random() * 600);
    };

    const handleQuickAction = (action: string) => {
        if (action === 'call') {
            window.open('tel:1300796987', '_self');
            return;
        }

        const userMsg =
            action === 'quote' ? "I'd like to get a free quote" : "Tell me about your services";

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: userMsg, sender: 'user', timestamp: new Date() },
        ]);

        addBotMessage(botResponses[action] || botResponses.default);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: input.trim(), sender: 'user', timestamp: new Date() },
        ]);
        setInput('');
        addBotMessage(botResponses.default);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setHasUnread(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-white rounded-2xl shadow-2xl shadow-navy/20 border border-slate-200 w-[360px] mb-4 overflow-hidden flex flex-col"
                        style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-navy to-royal p-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        Auzclean Assistant
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-[11px] text-white/60">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
                                aria-label="Close chat"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${msg.sender === 'user'
                                                ? 'bg-royal text-white rounded-2xl rounded-br-md'
                                                : 'bg-white text-slate-700 rounded-2xl rounded-bl-md border border-slate-100 shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <div className="flex justify-start">
                                    <div className="bg-white rounded-2xl rounded-bl-md border border-slate-100 shadow-sm px-4 py-3 flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions (only show if few messages) */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-3 bg-white border-t border-slate-100 space-y-2 shrink-0">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.action}
                                        onClick={() => handleQuickAction(action.action)}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 bg-slate-50 hover:bg-royal/5 hover:text-royal border border-slate-200 hover:border-royal/20 transition-all group"
                                    >
                                        <action.icon size={16} className="shrink-0" />
                                        <span className="flex-1 text-left font-medium">{action.label}</span>
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                            <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-royal/40 focus-within:ring-2 focus-within:ring-royal/10 transition-all px-4 py-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="w-8 h-8 rounded-lg bg-royal text-white flex items-center justify-center hover:bg-navy transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                                    aria-label="Send message"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 text-center mt-2">
                                AI-powered assistant • Responses are pre-configured
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={open ? () => setOpen(false) : handleOpen}
                className="relative w-14 h-14 bg-gradient-to-br from-royal to-teal rounded-full shadow-lg shadow-royal/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-royal/40 transition-shadow"
                aria-label={open ? 'Close chat' : 'Open chat'}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <X size={22} />
                        </motion.span>
                    ) : (
                        <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <MessageCircle size={22} />
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Unread dot */}
                {hasUnread && !open && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                    />
                )}
            </motion.button>
        </div>
    );
}
