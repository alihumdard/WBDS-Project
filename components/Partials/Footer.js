"use client";
import Link from "next/link";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { trackCtaClick } from "@/components/analytics";

const Footer = ({ lang }) => {
  const getHref = (path) => {
    if (lang === "ar") {
      return path === "/" ? "/arabic" : `/arabic${path}`;
    }
    return path;
  };
  return (
    <footer className="relative bg-black text-white pt-16 pb-8 border-t border-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/Assets/MapImg/Step-1.webp')" }}
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          <div className="col-span-1 lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="w-45 object-contain" />
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-sm">
              Purchasers of Dead Stock based out of Dubai,UAE,with office in Germany and Pakistan.
            </p>

            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/webuydeadstocks" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'Instagram', location: 'Footer', category: 'Social', linkUrl: 'https://www.instagram.com/webuydeadstocks' })}>
                <Instagram className="w-9 h-9 pointer-events-none" strokeWidth={1.25} />
              </Link>
              <Link href="https://www.linkedin.com/company/chaudary-anwar-tr.-co-llc/posts/?feedView=all" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'LinkedIn', location: 'Footer', category: 'Social', linkUrl: 'https://www.linkedin.com/company/chaudary-anwar-tr.-co-llc/posts/?feedView=all' })}>
                <Linkedin className="w-9 h-9 pointer-events-none" strokeWidth={1.25} />
              </Link>
              <Link href="https://www.facebook.com/webuydeadstocks/" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'Facebook', location: 'Footer', category: 'Social', linkUrl: 'https://www.facebook.com/webuydeadstocks/' })}>
                <Facebook className="w-9 h-9 pointer-events-none" strokeWidth={1.25} />
              </Link>
              <Link href="https://www.tiktok.com/@webuydeadstocks.com?is_from_webapp=1&sender_device=pc" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'TikTok', location: 'Footer', category: 'Social', linkUrl: 'https://www.tiktok.com/@webuydeadstocks.com?is_from_webapp=1&sender_device=pc' })}>
                <Image src="/images/tiktok-outline.svg" alt="Tiktok" className="w-9 h-9 pointer-events-none invert" width={36} height={36} />
              </Link>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <Link href={getHref("/services")} className="text-xl font-bold">Services</Link>
            <ul className="flex flex-col gap-4 pt-6">
              <li>
                <Link href={getHref("/services")} className="text-gray-300 hover:text-white transition-colors text-base">
                  What we buy
                </Link>
              </li>
              <li>
                <Link href={getHref("/Blogs")} className="text-gray-300 hover:text-white transition-colors text-base">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-4">
            <Link href={getHref("/contact")} className="text-xl font-bold" onClick={() => trackCtaClick({ buttonName: 'Contact Us', location: 'Footer Heading', linkUrl: getHref("/contact") })}>Contact Us</Link>
            <ul className="flex flex-col gap-4 pt-6">
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gray-300 mt-0.5" strokeWidth={1.5} />
                <a href="mailto:info@webuydeadstocks.com" className="text-gray-300 hover:text-white transition-colors text-base" onClick={() => trackCtaClick({ buttonName: 'Email', location: 'Footer', linkUrl: 'mailto:info@webuydeadstocks.com' })}>
                  info@webuydeadstocks.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gray-300 mt-0.5" strokeWidth={1.5} />
                <a href="tel:+97165390377" className="text-gray-300 hover:text-white transition-colors text-base" onClick={() => trackCtaClick({ buttonName: 'Phone', location: 'Footer', linkUrl: 'tel:+97165390377' })}>
                  (+971) 6 539 0377
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-300 mt-0.5" strokeWidth={1.5} />
                <span className="text-gray-300 text-base">
                  P. O. Box 31146, Sharjah, UAE
                </span>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <Link href={getHref("/about")} className="text-xl font-bold">About Us</Link>
            <ul className="flex flex-col gap-4 pt-6">
              <li>
                <Link href={getHref("/about")} className="text-gray-300 hover:text-white transition-colors text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={getHref("/contact")} className="text-gray-300 hover:text-white transition-colors text-base" onClick={() => trackCtaClick({ buttonName: 'Contact Us', location: 'Footer Links', linkUrl: getHref("/contact") })}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={getHref("/privacy")} className="text-gray-300 hover:text-white transition-colors text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={getHref("/terms")} className="text-gray-300 hover:text-white transition-colors text-base">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm text-center">
            © 2025 We Buy Dead Stocks Dubai,UAE. All Rights Reserved by WeBuyDeadStock
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
