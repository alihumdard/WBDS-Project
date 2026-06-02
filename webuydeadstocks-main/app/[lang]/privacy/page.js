import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for We Buy Dead Stocks",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="bg-black h-[40vh] flex items-center text-white py-12 px-10 sm:px-10 lg:px-20">
        <div className="w-full mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-base">Back</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light">
            Privacy Policy
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
          We Buy Dead Stocks values your privacy and is committed to protecting your personal
          information. This Privacy Policy outlines how we collect, use, and protect your data when you
          visit our website, www.webuydeadstocks.com.
        </p>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
            We collect two types of information:
          </p>
          <ul className="space-y-4 ml-4 sm:ml-6 mb-4">
            <li className="text-gray-700 text-base sm:text-lg">
              <strong className="font-semibold text-gray-900">Personal Information:</strong> This may include your name, email, phone number, company details, and payment details when you engage with us.
            </li>
            <li className="text-gray-700 text-base sm:text-lg">
              <strong className="font-semibold text-gray-900">Non-Personal Information:</strong> We collect data such as IP address, browser type, cookies, and usage data to improve the Site and services.
            </li>
          </ul>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
            We use your information for the following purposes:
          </p>
          <ul className="space-y-2 ml-4 sm:ml-6">
            <li className="text-gray-700 text-base sm:text-lg">
              • To process inquiries and transactions.
            </li>
            <li className="text-gray-700 text-base sm:text-lg">
              • To improve our website and services.
            </li>
            <li className="text-gray-700 text-base sm:text-lg">
              • To comply with legal obligations.
            </li>
            <li className="text-gray-700 text-base sm:text-lg">
              • To send updates and promotional content (if you have consented).
            </li>
          </ul>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            3. Sharing Your Information
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
            We do not sell or share your personal data. We may share it with:
          </p>
          <ul className="space-y-2 ml-4 sm:ml-6">
            <li className="text-gray-700 text-base sm:text-lg">
              • Legal authorities if required by law.
            </li>
          </ul>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            4. Cookies & Tracking
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We use cookies to enhance functionality and analyze website traffic. You can manage cookie
            preferences through your browser settings. By using the Site, you consent to the use of cookies.
          </p>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            5. Data Security
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We implement security measures to protect your data. However, no online transmission is 100%
            secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            6. Your Rights
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            You have the right to access, correct, or delete your personal data. To exercise these rights, please
            contact us at info@webuydeadstocks.com.
          </p>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page,
            and the &quot;Last Updated&quot; date will reflect the most recent changes.
          </p>
        </section>

        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            8. Contact Us
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-4 leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy, please contact us:
          </p>
          <div className="space-y-3 ml-4 sm:ml-6">
            <div className="flex items-start gap-2">
              <span className="text-gray-900 text-lg">📧</span>
              <p className="text-gray-700 text-base sm:text-lg">
                Email: info@webuydeadstocks.com
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-900 text-lg">📞</span>
              <p className="text-gray-700 text-base sm:text-lg">
                Phone: +97165390377
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-900 text-lg">📍</span>
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
            "name": "Privacy Policy - We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/privacy"
          })
        }}
      />
    </div>
  );
}