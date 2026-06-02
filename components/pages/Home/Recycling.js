"use client";

import { useRef } from "react";
import React from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Recycling = () => {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const textContainerRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const bottomPanelRef = useRef(null);
    const cloud1Ref = useRef(null);
    const cloud2Ref = useRef(null);

    useGSAP(() => {
        const text1Split = new SplitType(text1Ref.current, { types: 'words' });
        const text2Split = new SplitType(text2Ref.current, { types: 'words' });
        const bottomItems = gsap.utils.toArray(bottomPanelRef.current.children);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.set(text1Ref.current, { opacity: 1 });
            gsap.set(text2Ref.current, { opacity: 1 });
            gsap.set(bottomPanelRef.current, { opacity: 1 });

            gsap.set(text1Split.words, { opacity: 0, y: 30 });
            gsap.set(text2Split.words, { opacity: 0, y: 30 });
            gsap.set(bottomItems, { opacity: 0, y: 30 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            tl.to({}, { duration: 0.5 })
                .to(videoRef.current, {
                    clipPath: "circle(100% at 50% 50%)",
                    duration: 1,
                    ease: "power2.inOut"
                })
                .to(cloud1Ref.current, {
                    xPercent: -50,
                    x: -300,
                    opacity: 0,
                    duration: 1,
                    ease: "power1.inOut"
                }, "<")
                .to(cloud2Ref.current, {
                    xPercent: 50,
                    x: 300,
                    opacity: 0,
                    duration: 1,
                    ease: "power1.inOut"
                }, "<")
                .to(text1Split.words, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.2")
                .to(bottomItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "<+=0.1")
                .to(text1Split.words, {
                    opacity: 0,
                    y: -30,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power3.in"
                }, "+=0.5")
                .to(text2Split.words, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.2");
        });

        mm.add("(max-width: 767px)", () => {
            const leftContent = bottomPanelRef.current.children[0];
            const rightCards = gsap.utils.toArray(bottomPanelRef.current.children[1].children);
            const allMobileBottomItems = [leftContent, ...rightCards];

            gsap.set(text1Ref.current, { opacity: 1 });
            gsap.set(text2Ref.current, { opacity: 1 });
            gsap.set(bottomPanelRef.current, { opacity: 1, yPercent: 120 });

            gsap.set(text1Split.words, { opacity: 0, y: 20 });
            gsap.set(text2Split.words, { opacity: 0, y: 20 });
            gsap.set(allMobileBottomItems, { opacity: 0, y: 30 });

            const tlMobile = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3500",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });

            tlMobile.to({}, { duration: 0.2 })
                .to(videoRef.current, { clipPath: "circle(100% at 50% 50%)", duration: 1, ease: "power2.inOut" })
                .to(cloud1Ref.current, { xPercent: -50, x: -150, opacity: 0, duration: 1, ease: "power1.inOut" }, "<")
                .to(cloud2Ref.current, { xPercent: 50, x: 150, opacity: 0, duration: 1, ease: "power1.inOut" }, "<")
                .to(text1Split.words, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=0.2")
                .to(text1Split.words, { opacity: 0, y: -20, duration: 0.5, stagger: 0.05, ease: "power3.in" }, "+=0.6")
                .to(text2Split.words, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=0.2")
                .to(text2Split.words, { opacity: 0, y: -20, duration: 0.5, stagger: 0.05, ease: "power3.in" }, "+=0.6")
                .to(bottomPanelRef.current, { yPercent: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
                .to(allMobileBottomItems, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "<+=0.2");
        });

        return () => {
            text1Split.revert();
            text2Split.revert();
        };

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative block w-full h-screen overflow-hidden bg-[#57853A] z-10">

            <div ref={cloud1Ref} className="absolute top-10 md:top-20 left-4 md:left-10 opacity-80 z-20 w-64 md:w-[600px] pointer-events-none">
                <img src="/images/cloud.webp" alt="cloud" className="w-full h-auto object-contain" />
            </div>
            <div ref={cloud2Ref} className="absolute bottom-10 md:bottom-20 right-4 md:right-10 opacity-80 z-20 w-64 md:w-[600px] pointer-events-none">
                <img src="/images/cloud2.webp" alt="cloud" className="w-full h-auto object-contain" />
            </div>

            <div
                ref={videoRef}
                className="absolute inset-0 w-full h-full z-0"
                style={{ clipPath: "circle(20% at 50% 50%)" }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/video/nature.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="absolute inset-0 w-full h-full z-10 flex flex-col justify-between pointer-events-none">

                <div ref={textContainerRef} className="relative w-full h-full pt-20 px-6 md:pt-24 md:pl-16 text-white pointer-events-auto">
                    <h3 ref={text1Ref} className="absolute text-[13vw] sm:text-[10vw] md:text-[80px] font-bold leading-[1.1] tracking-tight text-white mb-4" style={{ opacity: 0 }}>
                        Forget<br />Recycling
                    </h3>
                    <h3 ref={text2Ref} className="absolute text-[11vw] sm:text-[9vw] md:text-[80px] font-bold leading-[1.1] tracking-tight text-white mb-4" style={{ opacity: 0 }}>
                        We Re-sell<br />Responsibly<br />Worldwide
                    </h3>
                </div>

                <div ref={bottomPanelRef} className="absolute md:relative bottom-0 w-full flex flex-col md:flex-row pointer-events-auto">

                    <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-end">
                        <p className="text-white text-[13px] sm:text-sm md:text-base mb-4 md:mb-6 max-w-lg leading-relaxed text-[#f0f0f0]">
                            We help you move dead stock responsibly by buying it and selling it to developing countries.
                            This approach not only reduces waste but also supports affordable access to goods in emerging markets.
                            By choosing this sustainable solution, you're making a positive impact on both your bottom line and the environment.
                        </p>
                        <Link href="/services" className="text-white border border-white px-5 py-2 md:px-6 md:py-2 text-[10px] sm:text-xs tracking-widest hover:bg-white hover:text-black transition-colors w-fit font-medium">
                            LEARN MORE
                        </Link>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col sm:flex-row">
                        <div className="flex-1 bg-[#57853A] p-6 md:p-14 text-white">
                            <div className="mb-4 md:mb-6 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
                                <Image src="/images/ArrowCounterClockwise.svg" alt="ArrowCounterClockwise" width={48} height={48} className="w-full h-full" />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-[32px] font-bold leading-none mb-2 md:mb-4 tracking-tight">
                                WE RESELL YOUR<br />DEAD INVENTORY
                            </h3>
                            <p className="text-xs sm:text-sm text-[#f0f0f0] leading-relaxed">
                                Our service ensures that your dead stock is repurposed responsibly.
                            </p>
                        </div>

                        <div className="flex-1 bg-[#2D2D2D] p-6 md:p-14 text-white">
                            <div className="mb-4 md:mb-6 h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md">
                                <Image src="/images/ShieldCheck.svg" alt="ShieldCheck" width={48} height={48} className="w-full h-full" />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-[32px] font-bold leading-none mb-2 md:mb-4 tracking-tight">
                                BRAND<br />PROTECTION
                            </h3>
                            <p className="text-xs sm:text-sm text-[#f0f0f0] leading-relaxed">
                                You never have to re-enter the market in ways that devalue your brand or harm your reputation.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Recycling;