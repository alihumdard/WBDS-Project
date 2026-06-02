'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        id: 1,
        title: 'Electrical & Automation',
        image: 'images/Electrical.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 2,
        title: 'Construction & Building Solutions',
        image: 'images/Construction.webp',
        className: 'col-span-1 md:row-span-2',
    },
    {
        id: 3,
        title: 'Energy, Marine & Aerospace',
        image: '/images/Energy.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 4,
        title: 'Tools & Equipments',
        image: '/images/Tool.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 5,
        title: 'Consumer Goods & Lifestyle',
        image: '/images/Consumer.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 6,
        title: 'Industrial Equipments & Components',
        image: '/images/Industry.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 7,
        title: 'Technology & Power Solutions',
        image: '/images/Technology.webp',
        className: 'col-span-1 row-span-1',
    },
    {
        id: 8,
        title: 'Scrap',
        image: '/images/Scrap.webp',
        className: 'col-span-1 row-span-1',
    },
];

const Services = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            '.interest-card',
            {
                y: 80,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-white py-16 md:py-24 px-6 lg:px-16 overflow-hidden">
            <div className="w-full mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-[54px] font-black mb-4 text-[#1A1A1A] tracking-tight uppercase leading-none">SERVICES</h2>
                        <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed font-medium">
                            We purchase a wide range of used and unused surplus, overstock or dead inventory and scrap from multiple industries, including manufacturing, construction, IT and retail. Discover the stocks we love.
                        </p>
                    </div>
                    <Link href="/services" className="flex items-center gap-3 border border-black px-6 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors min-w-max cursor-pointer">
                        LEARN MORE
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[320px]">
                    {items.map((item) => (
                        <Link href={`/services/${item.title.toLowerCase().replace(/ & /g, '-and-').replace(/\\s+/g, '-')}`} key={item.id} className={`interest-card block ${item.className}`} style={{ willChange: 'transform, opacity' }}>
                            <div
                                className="group relative overflow-hidden rounded-2xl w-full h-full cursor-pointer"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end gap-4">
                                    <h3 className="text-white text-lg md:text-xl font-bold leading-snug drop-shadow-md">
                                        {item.title}
                                    </h3>
                                    <div className="w-10 h-10 shrink-0 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;