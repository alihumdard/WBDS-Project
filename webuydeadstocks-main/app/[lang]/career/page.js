'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';




export default function Career() {

  return (
    <section id="categories">
      <div className="relative h-[50vh] w-full">
        <Image
          src="/images/carrer.webp"
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
          <h1 className="text-white text-6xl sm:text-6xl lg:text-6xl font-medium leading-tight max-w-5xl">
            Join us
          </h1>
          <div className="text-white text-lg mb-3 tracking-wide">
            Join The Largest Dead Stock Buyer In The GCC Region
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-white px-6 py-16 sm:px-12 lg:px-24">
        
        <div className="mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            At We Buy Dead Stocks
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
            We've been helping businesses turn surplus inventory into cash for over 21 years.
            Our mission is to provide efficient, sustainable, and transparent surplus liquidation
            solutions. If you're passionate about supply chain management, sustainability, and
            business growth, we'd love to have you on board!
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
            How to Apply
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            Excited to join us? Send your resume and a brief cover letter to
            <a
              href="mailto:info@webuydeadstocks.com"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              info@webuydeadstocks.com
            </a>
            with the subject line: Application for [Job Role] – Your Name.
          </p>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Career - We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/career"
          })
        }}
      />
    </section>
  );
}