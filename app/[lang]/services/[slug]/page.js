import Services from '../page';
import { categories } from '@/lib/data';
import LenisResizer from '@/components/LenisResizer';
import ServiceFormTracker from '@/components/ServiceFormTracker';
import connectToDatabase from '@/lib/mongodb';
import ServicePage from '@/models/ServicePage';
import { getStaticServiceHtml, serviceTitleFromSlug, sanitizeServiceSlug } from '@/lib/servicePages';

function generateSlug(name) {
    return name.toLowerCase().replace(/ & /g, '-and-').replace(/\s+/g, '-');
}


function getCategoryMatch(slug) {
    return categories.find(c => generateSlug(c.name) === slug);
}

async function getPublishedServicePage(slug) {
    try {
        await connectToDatabase();
        return await ServicePage.findOne({ slug: sanitizeServiceSlug(slug), status: 'published' }).lean();
    } catch (error) {
        console.error('Service page database lookup failed:', error);
        return null;
    }
}

function parseSchemaJson(schemaJson) {
    if (!schemaJson) return null;
    try {
        return JSON.parse(schemaJson);
    } catch (error) {
        console.error('Invalid service schema JSON:', error);
        return null;
    }
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://webuydeadstocks.com";

function buildCanonicalUrl(slug) {
    return `${SITE_URL}/services/${slug}`;
}

function buildServiceSchema(databasePage, slug, title) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": title,
        "url": buildCanonicalUrl(slug),
        "description": databasePage.seo?.description || undefined,
        "image": databasePage.featuredImage?.url || undefined,
        "provider": {
            "@type": "Organization",
            "name": "We Buy Dead Stocks",
            "url": SITE_URL,
        },
    };
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
    
    const databasePage = await getPublishedServicePage(slug);
    if (databasePage) {
        const metadata = {
            title: databasePage.seo?.title || `${databasePage.title} - We Buy Dead Stocks`,
            description: databasePage.seo?.description || undefined,
        };

        metadata.alternates = {
            canonical: databasePage.seo?.canonicalUrl || buildCanonicalUrl(slug),
        };

        if (databasePage.featuredImage?.url) {
            const imageUrl = databasePage.featuredImage.url.startsWith("http")
                ? databasePage.featuredImage.url
                : `${SITE_URL}${databasePage.featuredImage.url}`;
            metadata.openGraph = {
                images: [
                    {
                        url: imageUrl,
                        alt: databasePage.featuredImage.altText || databasePage.title,
                    },
                ],
            };
        }

        return metadata;
    }
    
    if (getStaticServiceHtml(slug)) {
        const title = serviceTitleFromSlug(slug);
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

    const databasePage = await getPublishedServicePage(slug);
    const staticHtml = getStaticServiceHtml(slug);
    const shouldUseCustomContent = !staticHtml && databasePage?.contentSource !== 'static' && databasePage?.contentHtml;
    const serviceHtml = shouldUseCustomContent ? databasePage.contentHtml : staticHtml;
    if (serviceHtml) {
        const title = databasePage?.h1 || databasePage?.title || serviceTitleFromSlug(slug);
        const schema = parseSchemaJson(databasePage?.schemaJson)
            || (databasePage ? buildServiceSchema(databasePage, slug, title) : null);
        const shouldShowFeaturedImage = !staticHtml && databasePage?.featuredImage?.url;
            
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
                    {shouldShowFeaturedImage && (
                        <div className="mx-auto max-w-6xl px-6 pt-12">
                            <img
                                src={databasePage.featuredImage.url}
                                alt={databasePage.featuredImage.altText || title}
                                className="w-full max-h-[480px] rounded-lg object-cover"
                            />
                        </div>
                    )}
                    <div 
                        data-service-html
                        className="w-full lg:w-[100%] py-16"
                        dangerouslySetInnerHTML={{ __html: serviceHtml }} 
                    />
                </div>
                <ServiceFormTracker serviceTitle={title} />
                <LenisResizer />
                {schema && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <h1 className="text-3xl font-bold">Service Not Found</h1>
        </div>
    );
}
