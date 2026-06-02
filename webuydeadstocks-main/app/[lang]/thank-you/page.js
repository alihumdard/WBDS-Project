"use client";
import Link from 'next/link';
import { useEffect } from 'react';

export default function ThankYouPage() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const pendingConversion = window.sessionStorage.getItem('wbds_form_conversion_pending');
        if (!pendingConversion) return;

        window.sessionStorage.removeItem('wbds_form_conversion_pending');

        if (window.gtag) {
            window.gtag('event', 'conversion', {
                event_category: 'Lead',
                event_label: 'Form Completed',
                submission_id: pendingConversion
            });
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                <div className="w-20 h-20 rounded-full bg-[#80D741]/20 flex items-center justify-center mx-auto mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-[#80D741]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>

                <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-wide">
                    Thank You!
                </h1>

                <p className="text-gray-400 text-lg mb-4">
                    Your message has been received.
                </p>
                <p className="text-gray-500 text-base mb-12">
                    We appreciate you reaching out. Our team will get back to you as soon as possible.
                </p>

                <Link
                    href="/"
                    className="inline-block bg-[#80D741] text-white font-medium py-3 px-10 rounded-md transition-all duration-300 hover:bg-[#6ec235] text-lg"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
