"use client";
import Link from 'next/link';
import React from 'react';
import { trackCtaClick } from '@/components/analytics';

const Landing = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10 w-full mx-auto px-6 md:px-[3.3vw] 2xl:px-16 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-[2.1vw] 2xl:gap-10">
        <div className="flex flex-col items-start w-full md:w-auto">
          <h1 className="text-white text-2xl md:text-[2vw] 2xl:text-[38px] font-normal leading-snug mb-2 md:mb-[0.4vw] 2xl:mb-2 md:whitespace-nowrap">
            We Help Businesses, Turn Non-Moving<br />
            Inventory Into
          </h1>
          <h1 className="text-[#7ED957] text-6xl md:text-[5.7vw] 2xl:text-[110px] font-bold tracking-tighter leading-none mb-10 md:mb-[2.1vw] 2xl:mb-10 md:whitespace-nowrap">
            Cash & Space.
          </h1>
          <Link href="/get-free-valuation-dead-stocks" className="group flex items-center gap-3 md:gap-[0.6vw] 2xl:gap-3 border border-white text-white px-7 py-3 md:px-[1.4vw] md:py-[0.6vw] 2xl:px-7 2xl:py-3 text-sm md:text-[0.8vw] 2xl:text-base font-semibold tracking-[0.15em] hover:bg-white hover:text-black transition-all uppercase cursor-pointer md:whitespace-nowrap" onClick={() => trackCtaClick({ buttonName: 'Get Free Valuation', location: 'Hero', linkUrl: '/get-free-valuation-dead-stocks' })}>
            GET FREE VALUATION
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-[1vw] md:w-[1vw] 2xl:h-5 2xl:w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="flex justify-center md:justify-end w-full md:w-auto mt-12 md:mt-0">
          <p className="text-white text-xl md:text-[1.3vw] 2xl:text-[26px] font-normal text-center leading-snug md:whitespace-nowrap md:text-right 2xl:text-center">
            Your Trusted Partner in Liquidating Non-Moving<br />
            Inventory in UAE ,GCC & Across the globe
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
