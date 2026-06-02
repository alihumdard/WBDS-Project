"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, ChevronDown, X, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { trackCtaClick } from "@/components/analytics";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const container = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname === "/arabic" || pathname.startsWith("/arabic/");

  const handleSwitchLanguage = (lang) => {

    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;


    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=.${domain}`;

    let newPath;
    if (lang === "ar") {
      if (pathname === "/arabic" || pathname.startsWith("/arabic/")) {
        newPath = pathname;
      } else {
        newPath = pathname === "/" ? "/arabic" : `/arabic${pathname}`;
      }
    } else {
      newPath = pathname.replace(/^\/arabic/, "") || "/";
    }




    window.location.href = newPath;
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useGSAP(() => {
    if (isSidebarOpen) {
      gsap.fromTo(
        ".nav-link-item",
        { y: "100%" },
        {
          y: "0%",
          duration: 0.85,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.3
        }
      );
    } else {
      gsap.set(".nav-link-item", { y: "100%" });
    }
  }, { scope: container, dependencies: [isSidebarOpen] });

  const getHref = (path) => {
    if (isArabic) {
      return path === "/" ? "/arabic" : `/arabic${path}`;
    }
    return path;
  };

  const navLinks = [
    { label: "HOME", href: getHref("/") },
    { label: "SERVICES", href: getHref("/services") },
    { label: "ABOUT US", href: getHref("/about") },
    { label: "BLOGS", href: getHref("/Blogs") },
    { label: "BOOK A CALL", href: "https://calendly.com/webuydeadstocks-info/30min?primary_color=80d741", track: true },
    { label: "CONTACT US", href: getHref("/contact"), track: true },
  ];

  return (
    <>
      <nav className="w-full flex items-center justify-between fixed top-0 z-40" style={{ padding: 'clamp(12px, 1.1vw, 16px) clamp(16px, 1.6vw, 23px)', paddingLeft: 'clamp(20px, 2vw, 40px)' }}>
        <Link href={getHref("/")} className="flex items-center" style={{ gap: 'clamp(8px, 0.8vw, 12px)' }}>
          <Image src="/logo.png" alt="Logo" width={150} height={150} style={{ width: 'clamp(90px, 10.4vw, 150px)', height: 'auto' }} />
        </Link>

        <div className="flex items-center" style={{ gap: 'clamp(16px, 1.8vw, 26px)' }}>
          <div className="hidden lg:flex items-center" style={{ gap: 'clamp(20px, 2vw, 32px)' }}>
            <div
              className="relative"
              onMouseEnter={() => setIsLangOpen(true)}
              onMouseLeave={() => setIsLangOpen(false)}
            >
              <div className="flex items-center cursor-pointer text-[#84CC16]" style={{ gap: 'min(0.3vw, 6px)', padding: 'min(0.5vw, 8px)', marginLeft: 'max(-0.5vw, -8px)', fontSize: 'min(1.25vw, 20px)' }}>
                <span className="leading-none">文A</span>
                <ChevronDown strokeWidth={2} className={`mt-0.5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} style={{ width: 'min(1vw, 16px)', height: 'min(1vw, 16px)' }} />
              </div>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col z-50 transition-all duration-300 ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                style={{ marginTop: 'min(0.3vw, 4px)', width: 'min(8.3vw, 120px)', paddingBlock: 'min(0.3vw, 6px)' }}
              >
                <button
                  onClick={() => { handleSwitchLanguage('en'); setIsLangOpen(false); }}
                  className="text-center text-[#333333] font-medium hover:bg-gray-50 hover:text-[#84CC16] transition-colors"
                  style={{ padding: 'min(0.5vw, 8px) min(1vw, 16px)', fontSize: 'min(1.04vw, 15px)' }}
                >
                  English
                </button>
                <button
                  onClick={() => { handleSwitchLanguage('ar'); setIsLangOpen(false); }}
                  className="text-center text-[#333333] font-medium hover:bg-gray-50 hover:text-[#84CC16] transition-colors"
                  style={{ padding: 'min(0.5vw, 8px) min(1vw, 16px)', fontSize: 'min(1.04vw, 15px)' }}
                >
                  العربية
                </button>
              </div>
            </div>
            <Link href="https://www.webuydeadstock.com/get-free-valuation-dead-stocks" className="text-white font-semibold tracking-wider uppercase hover:text-gray-300 transition-colors" style={{ fontSize: 'min(0.97vw, 14px)' }} onClick={() => trackCtaClick({ buttonName: 'Get Free Valuation', location: 'Navbar', linkUrl: 'https://www.webuydeadstock.com/get-free-valuation-dead-stocks' })}>
              GET A FREE VALUATION
            </Link>
            <Link href="https://calendly.com/webuydeadstocks-info/30min?primary_color=80d741" className="flex items-center justify-center bg-transparent text-green-500 border border-green-500 font-bold tracking-wider uppercase hover:bg-green-500 duration-500 hover:text-white" style={{ fontSize: 'min(0.97vw, 14px)', padding: 'min(0.7vw, 10px) min(1.6vw, 24px)' }} onClick={() => trackCtaClick({ buttonName: 'Book A Call', location: 'Navbar', linkUrl: 'https://calendly.com/webuydeadstocks-info/30min?primary_color=80d741' })}>
              BOOK A CALL
            </Link>
          </div>
          <button onClick={toggleSidebar} className="flex flex-col cursor-pointer focus:outline-none" style={{ gap: 'clamp(4px, 0.42vw, 6px)', marginLeft: 'clamp(16px, 1vw, 16px)' }}>
            <div className="bg-white" style={{ width: 'clamp(24px, 2.2vw, 32px)', height: '2px' }}></div>
            <div className="bg-white" style={{ width: 'clamp(24px, 2.2vw, 32px)', height: '2px' }}></div>
          </button>
        </div>
      </nav>

      
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleSidebar}
      />

      
      <div
        ref={container}
        className={`fixed top-0 right-0 h-screen w-full bg-[#118B50] z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ maxWidth: 'clamp(300px, 33.3vw, 480px)' }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex flex-col justify-end">
          <div className="opacity-[0.05] text-white font-black leading-[0.85] tracking-tighter w-full whitespace-nowrap" style={{ fontSize: 'clamp(3rem, 4.2vw, 6rem)', paddingBottom: 'clamp(20px, 1.6vw, 32px)' }}>
            <div style={{ paddingLeft: 'min(0.8vw, 16px)' }}>WE BUY DEAD</div>
            <div style={{ paddingLeft: 'min(0.8vw, 16px)' }}>STOCKS</div>
          </div>
        </div>

        <div className="flex justify-end relative z-10" style={{ padding: 'clamp(20px, 1.6vw, 32px) clamp(20px, 2vw, 32px)' }}>
          <button onClick={toggleSidebar} className="text-white hover:text-gray-200 transition-colors cursor-pointer">
            <X strokeWidth={1} style={{ width: 'clamp(28px, 2.5vw, 40px)', height: 'clamp(28px, 2.5vw, 40px)' }} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center relative z-10" style={{ padding: '0 min(2.5vw, 48px)' }}>
          <nav className="flex flex-col items-end" style={{ gap: 'min(1.4vw, 32px)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group flex flex-col cursor-pointer text-white font-normal tracking-wide hover:text-gray-200 transition-colors uppercase text-left leading-tight"
                style={{ fontSize: 'clamp(28px, 2.1vw, 40px)' }}
                onClick={() => {
                  if (link.track) {
                    trackCtaClick({ buttonName: link.label, location: 'Sidebar', linkUrl: link.href });
                  }
                  toggleSidebar();
                }}
              >
                {link.label.split('\n').map((line, index) => (
                  <div key={index} className="overflow-hidden">
                    <div className="nav-link-item translate-y-full">
                      {line}
                    </div>
                  </div>
                ))}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-end relative z-10" style={{ gap: 'clamp(12px, 0.8vw, 16px)', padding: 'clamp(24px, 1.6vw, 48px) clamp(24px, 2.5vw, 48px)' }}>
          <div className="flex items-center" style={{ gap: 'clamp(16px, 1.2vw, 24px)', marginBottom: 'clamp(4px, 0.4vw, 8px)' }}>
            <div className="overflow-hidden">
              <button onClick={() => { handleSwitchLanguage('en'); toggleSidebar(); }} className="nav-link-item translate-y-full text-[#84CC16] font-bold tracking-widest uppercase hover:text-white transition-colors" style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }}>
                ENGLISH
              </button>
            </div>
            <div className="overflow-hidden">
              <span className="nav-link-item translate-y-full text-[#84CC16]" style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }}>/</span>
            </div>
            <div className="overflow-hidden">
              <button onClick={() => { handleSwitchLanguage('ar'); toggleSidebar(); }} className="nav-link-item translate-y-full text-[#84CC16] font-bold tracking-widest uppercase hover:text-white transition-colors" style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }}>
                العربية
              </button>
            </div>
          </div>
          <div className="flex items-center" style={{ gap: 'clamp(16px, 1.2vw, 24px)' }}>
            <Link href={getHref("/career")} className="overflow-hidden">
              <div className="nav-link-item translate-y-full text-white tracking-widest uppercase hover:text-gray-200" style={{ fontSize: 'clamp(12px, 0.9vw, 14px)' }}>
                CAREERS
              </div>
            </Link>
            <Link href={getHref("/environment")} className="overflow-hidden">
              <div className="nav-link-item translate-y-full text-white tracking-widest uppercase hover:text-gray-200" style={{ fontSize: 'min(0.9vw, 14px)' }}>
                ENVIRONMENT IMPACT
              </div>
            </Link>
          </div>
          <div className="overflow-hidden">
            <p className="nav-link-item translate-y-full text-white tracking-widest uppercase" style={{ fontSize: 'min(0.7vw, 12px)' }}>
              © POLICIES
            </p>
          </div>
          <div className="overflow-hidden" style={{ marginTop: 'min(1.2vw, 24px)' }}>
            <div className="nav-link-item translate-y-full flex items-center" style={{ gap: 'min(1.2vw, 24px)' }}>
              <Link href="https://www.instagram.com/webuydeadstocks/" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'Instagram', location: 'Navbar', category: 'Social', linkUrl: 'https://www.instagram.com/webuydeadstocks/' })}>
                <Instagram strokeWidth={1.5} style={{ width: 'min(1.4vw, 24px)', height: 'min(1.4vw, 24px)' }} />
              </Link>
              <Link href="https://www.linkedin.com/company/webuydeadstocks/" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'LinkedIn', location: 'Navbar', category: 'Social', linkUrl: 'https://www.linkedin.com/company/webuydeadstocks/' })}>
                <Linkedin strokeWidth={1.5} style={{ width: 'min(1.4vw, 24px)', height: 'min(1.4vw, 24px)' }} />
              </Link>
              <Link href="https://www.facebook.com/webuydeadstocks/" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'Facebook', location: 'Navbar', category: 'Social', linkUrl: 'https://www.facebook.com/webuydeadstocks/' })}>
                <Facebook strokeWidth={1.5} style={{ width: 'min(1.4vw, 24px)', height: 'min(1.4vw, 24px)' }} />
              </Link>
              <Link href="https://www.youtube.com/@WeBuyDeadStocks" target="_blank" className="text-white hover:text-gray-300 transition-colors" onClick={() => trackCtaClick({ buttonName: 'YouTube', location: 'Navbar', category: 'Social', linkUrl: 'https://www.youtube.com/@WeBuyDeadStocks' })}>
                <Youtube strokeWidth={1.5} style={{ width: 'min(1.4vw, 24px)', height: 'min(1.4vw, 24px)' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
