"use client";
import FAQ from "@/components/Partials/FAQ";
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Link from 'next/link';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { trackCtaClick } from '@/components/analytics';

const TikTokIcon = ({ className, strokeWidth = 1.5 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564" />
    </svg>
);

const ContactPage = () => {
    const router = useRouter();
    const formRef = useRef();

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [errors, setErrors] = useState({});
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        setSuccessMsg('');
        setGlobalError('');
        setErrors({});

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const subject = e.target.subject.value.trim();


        let isValid = true;
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email || !emailRegex.test(email)) {
            newErrors.email = 'Valid email is required';
            isValid = false;
        }

        if (!phone || phone.length < 10) {
            newErrors.phone = 'Valid phone number is required';
            isValid = false;
        }

        if (!subject) {
            newErrors.subject = 'Subject is required';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            setGlobalError('Please fix the errors above');
            return;
        }

        setLoading(true);

        const templateParams = {
            name: name,
            email: email,
            phone: phone,
            subject: subject
        };

        emailjs.init('m3_cXcrmA8tRDUV6B');

        emailjs.send('service_79d4mlb', 'template_e3zu3dp', templateParams)
            .then(() => {
                e.target.reset();
                setPhone('');
                if (typeof window !== 'undefined') {
                    window.sessionStorage.setItem('wbds_form_conversion_pending', Date.now().toString());
                }
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'form_submit', {
                        event_category: 'Contact Form',
                        event_label: 'Contact Page Submit'
                    });
                }
                router.push('/thank-you');
            })
            .catch((error) => {
                setGlobalError('Error sending message. Please try again later.');
                console.error('Email send error:', error);
            })
            .finally(() => {
                setLoading(false);
                setTimeout(() => setSuccessMsg(''), 5000);
            });
    };

    return (
        <>
            <div className="w-full min-h-screen flex flex-col md:flex-row border">
                
                <div className="w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white border-r border-gray-100">
                    <h1 className="text-5xl md:text-7xl font-light mb-6 text-black tracking-wide">
                        Let's get<br />in touch
                    </h1>

                    <p className="text-gray-600 text-lg mb-12 max-w-md">
                        Great! We're excited to hear from you and let's start something special together. contact us for inquiry
                    </p>

                    <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-sm border border-gray-100 relative bg-gray-100">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.0462991398695!2d55.402408575385195!3d25.302648477643235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ffa941f54e9%3A0x2a2384d9bf6808db!2sWe%20Buy%20Dead%20Stocks!5e0!3m2!1sen!2sin!4v1740681092375!5m2!1sen!2sin"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                
                <div className="w-full md:w-1/2 flex flex-col">

                    
                    <div className="w-full bg-[#1a1a1a] p-8 md:p-16 lg:px-24 py-16 flex flex-col justify-center text-white min-h-[60vh] md:min-h-auto flex-grow">
                        <h2 className="text-4xl font-normal mb-12 text-white">Say Hello!</h2>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 w-full relative">
                            {globalError && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md mb-6">
                                    {globalError}
                                </div>
                            )}
                            {successMsg && (
                                <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md mb-6">
                                    {successMsg}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="relative">
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="[Your name/company name]"
                                        className={`w-full bg-transparent border-b py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-white transition-colors ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                    {errors.name && <small className="text-red-500 text-sm absolute -bottom-6 left-0">{errors.name}</small>}
                                </div>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="[Email]"
                                        className={`w-full bg-transparent border-b py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-white transition-colors ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                    {errors.email && <small className="text-red-500 text-sm absolute -bottom-6 left-0">{errors.email}</small>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-[50px]">
                                <div className="relative custom-phone-input">
                                    <PhoneInput
                                        placeholder="81234 56789"
                                        defaultCountry="IN"
                                        value={phone}
                                        onChange={setPhone}
                                        className={`w-full bg-transparent border-b py-3 text-gray-300 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-600 focus-within:border-white'}`}
                                    />
                                    {errors.phone && <small className="text-red-500 text-sm absolute -bottom-6 left-0">{errors.phone}</small>}
                                </div>
                                <div className="relative">
                                    <input
                                        name="subject"
                                        type="text"
                                        placeholder="[Subject]"
                                        className={`w-full bg-transparent border-b py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-white transition-colors ${errors.subject ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                    {errors.subject && <small className="text-red-500 text-sm absolute -bottom-6 left-0">{errors.subject}</small>}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#80D741] cursor-pointer text-white font-medium py-3 px-12 rounded-md transition-all duration-300 shadow-lg text-lg disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>

                    
                    <div className="w-full bg-white p-8 md:p-16 lg:px-24 py-16 flex flex-col justify-center">
                        <h3 className="text-4xl text-[#2d2d2d] mb-8 font-normal tracking-wide">
                            Reach out to us at
                        </h3>
                        <div className="flex gap-4 mb-10">
                            <Link href="https://www.instagram.com/webuydeadstocks" target="_blank" className="text-[#80D741] hover:scale-110 transition-transform" onClick={() => trackCtaClick({ buttonName: 'Instagram', location: 'Contact Page', category: 'Social', linkUrl: 'https://www.instagram.com/webuydeadstocks' })}>
                                <Instagram strokeWidth={1.5} className="w-11 h-11" />
                            </Link>
                            <Link href="https://www.linkedin.com/company/chaudary-anwar-tr.-co-llc/posts/?feedView=all" target="_blank" className="text-[#80D741] hover:scale-110 transition-transform" onClick={() => trackCtaClick({ buttonName: 'LinkedIn', location: 'Contact Page', category: 'Social', linkUrl: 'https://www.linkedin.com/company/chaudary-anwar-tr.-co-llc/posts/?feedView=all' })}>
                                <Linkedin strokeWidth={1.5} className="w-11 h-11" />
                            </Link>
                            <Link href="https://www.facebook.com/webuydeadstocks/" target="_blank" className="text-[#80D741] hover:scale-110 transition-transform" onClick={() => trackCtaClick({ buttonName: 'Facebook', location: 'Contact Page', category: 'Social', linkUrl: 'https://www.facebook.com/webuydeadstocks/' })}>
                                <Facebook strokeWidth={1.5} className="w-11 h-11" />
                            </Link>
                            <Link href="https://www.tiktok.com/@webuydeadstocks.com?is_from_webapp=1&sender_device=pc" target="_blank" className="text-[#80D741] hover:scale-110 transition-transform" onClick={() => trackCtaClick({ buttonName: 'TikTok', location: 'Contact Page', category: 'Social', linkUrl: 'https://www.tiktok.com/@webuydeadstocks.com?is_from_webapp=1&sender_device=pc' })}>
                                <TikTokIcon strokeWidth={1.5} className="w-11 h-11" />
                            </Link>
                        </div>
                        <Link
                            href="https://calendly.com/webuydeadstocks-info/30min?primary_color=80d741"
                            target="_blank"
                            className="w-fit border border-[#2d2d2d] text-[#2d2d2d] rounded-lg py-3 px-6 font-medium hover:bg-[#2d2d2d] hover:text-white transition-all text-base"
                            onClick={() => trackCtaClick({ buttonName: 'Schedule a Call', location: 'Contact Page', linkUrl: 'https://calendly.com/webuydeadstocks-info/30min?primary_color=80d741' })}
                        >
                            Schedule a call on Calendely
                        </Link>
                    </div>

                </div>
            </div>
            <FAQ />
            <style jsx global>{`
                .custom-phone-input .PhoneInputInput {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: rgb(209 213 219);
                }
                .custom-phone-input .PhoneInputInput::placeholder {
                    color: rgb(107 114 128);
                }
                .custom-phone-input .PhoneInputCountryIcon {
                    width: 1.5em;
                    height: 1em;
                }
                .custom-phone-input .PhoneInputCountrySelectArrow {
                    border-color: rgb(156 163 175);
                }
                .custom-phone-input .PhoneInputCountry {
                    margin-right: 0.75rem;
                }
                .custom-phone-input select {
                    background-color: #1a1a1a;
                    color: white;
                }
                .custom-phone-input select option {
                    background-color: #1a1a1a;
                    color: white;
                }
            `}</style>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contact Us - We Buy Dead Stocks",
                        "url": "https://webuydeadstocks.com/contact",
                        "description": "Get in touch with We Buy Dead Stocks. We're excited to hear from you.",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "We Buy Dead Stocks",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+97165390377",
                                "contactType": "customer service",
                                "email": "info@webuydeadstocks.com"
                            }
                        }
                    })
                }}
            />
        </>
    );
};

export default ContactPage;
