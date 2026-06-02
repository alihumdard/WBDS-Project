import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: "Terms and Conditions",
    description: "Terms and Conditions for We Buy Dead Stocks",
};

export default function Terms() {
    return (
        <div className="min-h-screen bg-white">
            
            <div className="bg-black h-[40vh] flex items-center text-white py-12 px-10 sm:px-10 lg:px-20">
                <div className="w-full mx-auto">
                    <Link href="/">
                        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-8">
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-base">Back</span>
                        </button>
                    </Link>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light">
                        Terms and Conditions
                    </h1>
                </div>
            </div>

            
            <div className="lg:w-[70%] px-10 sm:px-10 lg:px-20 py-12 sm:py-16">
                
                <div className="mb-8 space-y-1">
                    <p className="text-gray-800 text-base sm:text-lg">
                        Effective Date : February 22, 2025
                    </p>
                    <p className="text-gray-800 text-base sm:text-lg">
                        Last Updated : February 22, 2025
                    </p>
                </div>

                
                <p className="text-gray-700 text-base sm:text-lg mb-12 leading-relaxed">
                    By using We Buy Dead Stocks ("we," "our," or "us") and our services through www.webuydeadstocks.com (the "Site"), you ("you" or "User") agree to these Terms and Conditions.
                </p>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        1. Services Provided
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        We Buy Dead Stocks buys non-moving inventory (deadstock) exclusively from businesses (B2B). We do not sell materials or offer services to individuals. We provide pricing based on material details submitted, which usually range from 5% to 20% of the original cost, but may sometimes be as low as 0.5% to 1%. Upfront payment is made via cash or bank transfer, no credit transfers.
                    </p>
                </section>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        2. Transactions
                    </h2>
                    <ul className="space-y-4 ml-4 sm:ml-6">
                        <li className="text-gray-700 text-base sm:text-lg">
                            <strong className="text-gray-900 font-semibold">Order Process:</strong> Businesses submit details of materials, and we provide a price quote valid for 3 weeks.
                        </li>
                        <li className="text-gray-700 text-base sm:text-lg">
                            <strong className="text-gray-900 font-semibold">Payment:</strong> Payment is made upfront in cash or bank transfer.
                        </li>
                        <li className="text-gray-700 text-base sm:text-lg">
                            <strong className="text-gray-900 font-semibold">Cancellation:</strong> Orders may be canceled or prices revised if materials don’t match submitted details or quantities decrease.
                        </li>
                    </ul>
                </section>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        3. Intellectual Property
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        All content on the Site, including text, graphics, logos, and images, are the property of We Buy Dead Stocks. You may not reproduce, modify, or use any content from the Site without our prior written consent.
                    </p>
                </section>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        4. Limitation of Liability
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        We are not liable for any errors, downtime, or damages from the use of the Site or our services. We are not responsible for discrepancies between submitted material details and actual products.
                    </p>
                </section>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        5. Changes to Terms
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        We may update these Terms at any time. Updates will be posted on this page, and continued use of the Site indicates your acceptance of the new Terms.
                    </p>
                </section>

                
                <section className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                        6. Contact Us
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
                        For any questions, contact us at:
                    </p>
                    <div className="space-y-3 ml-4 sm:ml-6">
                        <div className="flex items-start gap-2">
                            <span className="text-red-500 text-lg">📧</span>
                            <p className="text-gray-700 text-base sm:text-lg">
                                Email: info@webuydeadstocks.com
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-500 text-lg">📞</span>
                            <p className="text-gray-700 text-base sm:text-lg">
                                Phone: +97165390377
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-red-500 text-lg">📍</span>
                            <p className="text-gray-700 text-base sm:text-lg">
                                Address: P.O. Box 31146, Sharjah, UAE
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Terms and Conditions - We Buy Dead Stocks",
                        "url": "https://webuydeadstocks.com/terms"
                    })
                }}
            />
        </div>
    );
}