'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Environment() {

  return (
    <section id="categories">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/images/Environment-Back.webp"
          alt="Some title"
          fill
          className="object-cover"
          priority
        />
        
        <div className="absolute inset-0 bg-black/60" />

        
        <div className="relative h-full w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
          <Link
            href="/Blogs"
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors text-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>

          <h1 className="text-white text-4xl sm:text-6xl lg:text-6xl font-medium leading-tight max-w-5xl">
            We Re-sell Responsibly
          </h1>

          <div className="text-white text-sm sm:text-lg md:text-xl leading-relaxed mb-3 max-w-5xl pt-2">
            We help you move dead stock responsibly by buying it and selling it to developing countries. This approach not only reduces waste but also supports affordable access to goods in emerging markets. By choosing this sustainable solution, you're making a positive impact on both your bottom line and the environment.
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white px-6 py-16 sm:px-12 lg:px-24">
        
        <div className="mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            We support Global goals through Sustainable practices.
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
            Our deadstock buyer services in the GCC not only help businesses recover value from their dead stock. We adhere to all local regulations and environmental guidelines, making sure that your scrap is recycled or disposed of in the most eco-friendly manner possible.
          </p>
        </div>

        
        <div className="mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-black text-white p-8 rounded-lg flex flex-col">
            <div className="mb-8">
              <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="32" cy="32" r="24" />
                <path d="M32 32 L32 16 A16 16 0 0 1 48 32 Z" fill="currentColor" fillOpacity="0.3" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Make an Impact</h3>
            <p className="text-gray-300 leading-relaxed">
              Help businesses recover losses and promote sustainability by repurposing or recycling surplus stock.
            </p>
          </div>

          
          <div className="bg-black text-white p-8 rounded-lg flex flex-col">
            <div className="mb-8">
              <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="12,48 24,36 36,42 52,20" />
                <polyline points="42,20 52,20 52,30" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Growth & Development</h3>
            <p className="text-gray-300 leading-relaxed">
              We invest in our team's growth through training, mentorship, and career advancement.
            </p>
          </div>

          
          <div className="bg-black text-white p-8 rounded-lg flex flex-col">
            <div className="mb-8">
              <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20,32 Q20,24 28,24 L36,24 Q44,24 44,32 Q44,40 36,40 L28,40 Q20,40 20,32" />
                <path d="M28,24 L28,18 Q28,14 32,14 Q36,14 36,18 L36,24" />
                <path d="M20,32 L16,28 M44,32 L48,28" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Collaborative Culture</h3>
            <p className="text-gray-300 leading-relaxed">
              Work alongside industry experts in a dynamic and supportive environment where your ideas and expertise matter.
            </p>
          </div>

          
          <div className="bg-black text-white p-8 rounded-lg flex flex-col">
            <div className="mb-8">
              <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="16" y="24" width="32" height="20" rx="2" />
                <circle cx="32" cy="34" r="4" />
                <path d="M16,24 L20,20 L44,20 L48,24" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Competitive Benefits</h3>
            <p className="text-gray-300 leading-relaxed">
              We offer market-competitive salaries, performance-based incentives, and flexible work arrangements.
            </p>
          </div>
        </div>

        
        <div className="mx-auto mt-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Forget Recycling. Get Cash For Your Products With Brand Protection
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
            Why invest in a recycling process when you can get your non-moving stock off your hands for good money? Our service ensures that your dead stock is repurposed responsibly; plus, you never have to worry about re-entering the market in ways that could devalue your brand or compromise your reputation.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Environment - We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/environment"
          })
        }}
      />
    </section>
  );
}