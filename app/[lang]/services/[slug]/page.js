import fs from 'fs';
import path from 'path';
import Services from '../page';
import { categories } from '@/lib/data';
import LenisResizer from '@/components/LenisResizer';
import ServiceFormTracker from '@/components/ServiceFormTracker';

function generateSlug(name) {
    return name.toLowerCase().replace(/ & /g, '-and-').replace(/\s+/g, '-');
}


function getCategoryMatch(slug) {
    return categories.find(c => generateSlug(c.name) === slug);
}

function getServiceHtml(slug) {

    const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
    const filePath = path.join(process.cwd(), 'service-next', `${safeSlug}.html`);
    if (!fs.existsSync(filePath)) return null;
    
    const rawHtml = fs.readFileSync(filePath, 'utf-8');
    
    const blogStartIndex = rawHtml.indexOf('<div class="blog');
    let blogEndIndex = rawHtml.indexOf('<div class="bg-[#121212]');
    if (blogEndIndex === -1) {
        blogEndIndex = rawHtml.indexOf('<footer');
    }
    
    let content = rawHtml;

    if (blogStartIndex !== -1 && blogEndIndex !== -1) {
        content = rawHtml.substring(blogStartIndex, blogEndIndex);
    } else {
        const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        if (bodyMatch) content = bodyMatch[1];
    }
    

    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    

    content = content.replace(/href="https?:\/\/(www\.)?webuydeadstocks\.com\/(service|services)\/([^"]*)"/gi, 'href="/services/$3"');
    
    return content;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    
    const categoryMatch = getCategoryMatch(slug);
    if (categoryMatch) {
        const categoryName = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return {
            title: `${categoryName} Services - We Buy Dead Stocks`,
        };
    }
    
    if (getServiceHtml(slug)) {
        const title = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        return {
            title: `${title} - We Buy Dead Stocks`,
        }
    }
    
    return { title: 'Not Found - We Buy Dead Stocks' };
}

export default async function SlugPage({ params }) {
    const { slug } = await params;

    const categoryMatch = getCategoryMatch(slug);
    if (categoryMatch) {
        const categoryName = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return (
            <>
                <Services />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": `${categoryName} Services - We Buy Dead Stocks`,
                            "url": `https://webuydeadstocks.com/services/${slug}`,
                            "provider": {
                                "@type": "Organization",
                                "name": "We Buy Dead Stocks"
                            }
                        })
                    }}
                />
            </>
        );
    }

    const serviceHtml = getServiceHtml(slug);
    if (serviceHtml) {
        const title = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
            
        return (
            <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
                
                <div className="relative h-[25vh] sm:h-[40vh] w-full">
                    
                    <div className="absolute inset-0 bg-black/80" />

                    
                    <div className="relative h-full w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
                        <a
                            href="/services"
                            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors text-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Services
                        </a>

                        <div className="text-white text-lg mb-3 tracking-wide">
                            Our Services
                        </div>

                        <h1 className="text-white text-4xl sm:text-4xl lg:text-4xl font-bold leading-tight max-w-5xl">
                            {title}
                        </h1>
                    </div>
                </div>

                
                <div className="bg-white">
                    <div 
                        data-service-html
                        className="w-full lg:w-[100%] py-16"
                        dangerouslySetInnerHTML={{ __html: serviceHtml }} 
                    />
                </div>
                <ServiceFormTracker serviceTitle={title} />
                <LenisResizer />
            </div>
        );
    }

    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <h1 className="text-3xl font-bold">Service Not Found</h1>
        </div>
    );
}
