import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { replaceOutdatedInternalHrefs } from '@/lib/urlReplacements';

async function fetchLocalArticle(slug) {
    await connectToDatabase();
    const blog = await Blog.findOne({ handle: slug }).lean();
    if (!blog) return null;
    return {
        id: blog._id.toString(),
        title: blog.title,
        handle: blog.handle,
        excerpt: blog.excerpt,
        publishedAt: blog.publishedAt,
        image: blog.image,
        contentHtml: blog.contentHtml,
        seo: blog.seo,
        redirectUrl: blog.redirectUrl || ""
    };
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = await fetchLocalArticle(slug);
    if (!article) return { title: '503 – Service Unavailable' };

    return {
        title: article.seo?.title || article.title,
        description: article.seo?.description || article.excerpt,
        alternates: {
            canonical: `/Blogs/${slug}`,
        },
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const article = await fetchLocalArticle(slug);

    if (article && article.redirectUrl && article.redirectUrl.trim() !== "") {
        redirect(article.redirectUrl.trim());
    }

    if (!article) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white px-4">
                <p className="text-8xl font-extrabold text-gray-900 mb-4">503</p>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Service Unavailable</h1>
                <p className="text-gray-500 mb-8 text-center max-w-md">
                    The page you&apos;re looking for could not be found or is temporarily unavailable.
                </p>
                <Link
                    href="/Blogs"
                    className="inline-block bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                    Back to Blogs
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            
            <div className="relative h-[50vh] w-full">
                {article.image && (
                    <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover"
                        priority
                        unoptimized={article.image.url?.startsWith('/uploads/')}
                    />
                )}
                
                <div className="absolute inset-0 bg-black/60" />

                
                <div className="relative h-full w-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors text-lg"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>

                    <div className="text-white text-lg mb-3 tracking-wide">
                        Dead Stock Blog
                    </div>

                    <h1 className="text-white text-4xl sm:text-4xl lg:text-4xl font-bold leading-tight max-w-5xl">
                        {article.title}
                    </h1>
                </div>
            </div>

            
            <div className="bg-white">
                <div className="w-full lg:w-[100%] px-6 sm:px-8 lg:px-12 py-16">
                    
                    <div className="text-gray-600 text-base mb-12">
                        Published on : {formattedDate}
                    </div>

                    
                    <div
                        className="prose prose-lg max-w-none
                        prose-headings:text-gray-900 prose-headings:font-bold prose-headings:text-3xl prose-headings:mb-6 prose-headings:mt-12
                        prose-p:text-gray-700 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words
                        prose-strong:text-gray-900 prose-strong:font-semibold
                        prose-ul:text-gray-700 prose-ul:text-lg
                        prose-ol:text-gray-700 prose-ol:text-lg
                        [&>h2]:text-4xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-10
                        [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>h3]:mt-8"
                        dangerouslySetInnerHTML={{ __html: replaceOutdatedInternalHrefs(article.contentHtml) }}
                    />
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": article.title,
                        "image": article.image ? article.image.url : "https://webuydeadstocks.com/images/default-blog.jpg",
                        "datePublished": article.publishedAt,
                        "author": {
                            "@type": "Organization",
                            "name": "We Buy Dead Stocks"
                        },
                        "description": article.seo?.description || article.excerpt
                    })
                }}
            />
        </div>
    );
}
