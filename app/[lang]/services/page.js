'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Wrench, Settings, Home, Laptop, Anchor, ShoppingBag, Recycle } from 'lucide-react';
import Image from 'next/image';
import Category from './components/category';
import { categories } from '@/lib/data';
import { services } from '@/lib/data';

export const generateSlug = (name) => {
  return name.toLowerCase().replace(/ & /g, '-and-').replace(/\s+/g, '-');
};

const STOP_WORDS = new Set(['a', 'an', 'the', 'in', 'of', 'for', 'to', 'and', 'your', 'our']);

function shortenTitle(title) {
  const words = title.trim().split(/\s+/).filter((word) => !STOP_WORDS.has(word.toLowerCase()));
  return (words.length ? words : title.trim().split(/\s+/)).slice(0, 2).join(' ');
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [dynamicServices, setDynamicServices] = useState([]);

  useEffect(() => {
    fetch('/api/service-pages/published')
      .then((res) => res.json())
      .then((data) => {
        const existingSlugs = new Set(services.map((service) => service.href.replace('/services/', '')));
        const items = (data.pages || [])
          .filter((page) => !existingSlugs.has(page.slug))
          .map((page) => ({
            id: `dynamic-${page.slug}`,
            name: shortenTitle(page.title),
            href: `/services/${page.slug}`,
          }));
        setDynamicServices(items);
      })
      .catch(() => setDynamicServices([]));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/services/')) {
        const slug = pathname.replace('/services/', '');

        const cleanSlug = slug.replace(/\/$/, '');
        if (cleanSlug) {
          const matched = categories.find(c => generateSlug(c.name) === cleanSlug);
          if (matched) {
            setActiveCategory(matched);
          }
        }
      }
    }
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/services/${generateSlug(category.name)}`);
    }
  };

  return (
    <div id="categories" className='h-fit w-full relative'>
      <div className="relative h-[50vh] w-full">
        <Image
          src="/images/carrer.webp"
          alt="Some title"
          fill
          className="object-cover object-[50%_4 0%]"
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
            Services
          </h1>

          <div className="text-white text-lg mb-3 tracking-wide max-w-5xl">
            We purchase a wide range of used and unused surplus, overstock or dead inventory and scrap from multiple industries, including manufacturing, construction, IT and retail. Discover the stocks we love.
          </div>
        </div>
      </div>
      <Category categories={categories} activeCategory={activeCategory} setActiveCategory={handleCategoryClick} />
      <section className="bg-white py-8 border-t border-b border-gray-200">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            OUR SERVICES
          </h2>

          
          <div className="flex flex-wrap gap-3">
            {(() => {
              const allServices = [...services, ...dynamicServices];
              return allServices.map((service, index) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="inline-block text-sm md:text-base text-green-600 hover:text-green-700 hover:underline transition-colors"
                >
                  {service.name}
                  {index < allServices.length - 1 && (
                    <span className="text-gray-400 ml-3">|</span>
                  )}
                </Link>
              ));
            })()}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Our Services - We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/services",
            "description": "We purchase a wide range of used and unused surplus, overstock or dead inventory and scrap from multiple industries."
          })
        }}
      />
    </div>
  );
}