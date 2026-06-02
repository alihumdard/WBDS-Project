"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
    const containerRef = useRef(null);
    const leftNumRef = useRef(null);
    const rightNumRef = useRef(null);

    useGSAP(() => {
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const counter1MaxScroll = -(5 / 6 * 100);
        const counter2MaxScroll = -(20 / 21 * 100);

        const price = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
            },
        });


        price.addLabel("first")
            .from(".percentage-animation", {
                x: isDesktop ? "50%" : "0%",
                y: isDesktop ? "0%" : "50%",
                scale: 1.5,
                willChange: "transform",
                duration: 2,
                ease: "power2.out",
            }, "first")
            .to(".title-1, .subtitle-1", {
                yPercent: -110,
                autoAlpha: 0,
                willChange: "transform",
                ease: "power2.out",
                duration: 1,
            }, "first+=0.4")
            .fromTo(".title-2, .subtitle-2",
                { yPercent: 100, autoAlpha: 0 },
                { yPercent: 0, autoAlpha: 1, willChange: "transform", ease: "power2.out", duration: 1 },
                "first+=0.7"
            );


        price.addLabel("Percentagesecond", "first+=2")
            .to(".percentage-anim-text", {
                color: "#0b7a11",
                fontVariationSettings: "'wght' 700",
                ease: "power2.out",
                duration: 1.5
            }, "Percentagesecond")
            .fromTo(".static-fade-text",
                { autoAlpha: 0, x: 0, y: 0, xPercent: 0, yPercent: 0, willChange: "opacity" },
                { autoAlpha: 1, x: 0, y: 0, xPercent: 0, yPercent: 0, ease: "power2.out", duration: 1.5 },
                "Percentagesecond"
            )
            .to(".title-2", {
                color: "#000000",
                ease: "power2.out",
                duration: 1.5
            }, "Percentagesecond")
            .to(".subtitle-2, .percentage-symbol", {
                color: "#4b4b4b",
                ease: "power2.out",
                duration: 1.5
            }, "Percentagesecond")
            .to(containerRef.current, {
                backgroundColor: "#ffffff",
                ease: "power2.out",
                duration: 1.5
            }, "Percentagesecond")
            .to(".percentage-line", {
                backgroundColor: "#1b1b1b",
                ease: "power2.out",
                duration: 1.5
            }, "Percentagesecond")
            .fromTo(".percentage-line",
                { scaleX: 0, transformOrigin: "center center" },
                { scaleX: 1, ease: "power2.out", duration: 1.5 },
                "Percentagesecond"
            )
            .to(leftNumRef.current, {
                yPercent: counter1MaxScroll,
                willChange: "transform",
                ease: "power2.out",
                duration: 2
            }, "Percentagesecond")
            .to(rightNumRef.current, {
                yPercent: counter2MaxScroll,
                willChange: "transform",
                ease: "power2.out",
                duration: 2
            }, "Percentagesecond");
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen w-full bg-[#ce3e3e] relative overflow-hidden flex flex-col pt-20">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between w-full px-[5%] absolute top-[8%] md:top-[15%] left-0 right-0 z-10">
                <div className="w-full md:w-[45%] grid">
                    <h3 className="title-1 col-start-1 row-start-1 text-white text-3xl md:text-5xl lg:text-5xl font-bold w-full leading-tight z-10">
                        Current value of your<br />Dead Stock
                    </h3>
                    <h3 className="title-2 col-start-1 row-start-1 text-white text-3xl md:text-5xl lg:text-5xl font-bold w-full leading-tight opacity-0 invisible z-20">
                        We Offer Fair & Upfront<br />Pricing
                    </h3>
                </div>
                <div className="w-full md:w-[45%] grid overflow-hidden items-start pb-4">
                    <p className="subtitle-1 col-start-1 row-start-1 text-white text-lg leading-relaxed z-10">
                        That 100% investment you made? Its value has now drastically dropped.
                        With no buyers and no movement, your dead stock is losing worth every
                        single day. What was once a valuable asset has turned into a liability,
                        taking up space and costing you more in storage and opportunity. But it
                        doesn&#39;t have to stay this way.
                    </p>
                    <p className="subtitle-2 col-start-1 row-start-1 text-white leading-relaxed opacity-0 text-lg invisible z-20">
                        Holding on to excess inventory costs more than eventually selling it off.
                        That&#39;s why we offer a straightforward pricing model when we buy dead
                        stock in the GCC. We will purchase your stock at 5-20% of your original
                        purchase cost, allowing you to recover value from non-moving inventory.
                        Whether it&#39;s completely dead stock, surplus items, or near-expiry goods,
                        we&#39;ll buy in bulk and take care of the logistics.
                    </p>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center pt-[40vh] md:pt-0 lg:pt-40 relative w-full h-full pb-10 md:pb-20">
                <div className="percentage-animation mt-[40vh] md:mt-0 pt-0 md:pt-[10vh] flex items-center justify-center w-full gap-[6vw] md:gap-[10vw]">
                    <div className="percentage-left relative flex flex-col items-center">
                        <span className="static-fade-text left-2 lg:left-0 opacity-0 invisible absolute -top-12 md:-top-20 text-[#171717] font-semibold text-sm md:text-lg whitespace-nowrap">
                            We buy your dead stock from
                        </span>
                        <div className="flex items-start h-[18vw] md:h-[15vw] overflow-hidden py-2 md:py-4">
                            <div ref={leftNumRef} className="flex flex-col">
                                {[0, 1, 2, 3, 4, 5].map((num) => (
                                    <span key={num} className="percentage-anim-text text-[18vw] md:text-[15vw] leading-[1] text-[#1b1b1b] font-semibold tracking-tight h-[18vw] md:h-[15vw] flex items-center">
                                        {num.toString().padStart(2, '0')}
                                    </span>
                                ))}
                            </div>
                            <span className="percentage-symbol text-[18vw] md:text-[15vw] leading-[1] text-white font-semibold tracking-tight h-[18vw] md:h-[15vw] flex items-center">%</span>
                        </div>
                    </div>

                    <div className="percentage-line w-[8vw] md:w-[6vw] h-1 md:h-1.5 bg-white scale-x-0 mt-[2vw] md:mt-0"></div>

                    <div className="percentage-right relative flex flex-col items-center">
                        <div className="flex items-start h-[18vw] md:h-[15vw] overflow-hidden py-2 md:py-4">
                            <div ref={rightNumRef} className="flex flex-col">
                                {Array.from({ length: 21 }, (_, i) => i).map((num) => (
                                    <span key={num} className="percentage-anim-text text-[18vw] md:text-[15vw] leading-[1] text-[#1b1b1b] font-semibold tracking-tight h-[18vw] md:h-[15vw] flex items-center">
                                        {num.toString().padStart(2, '0')}
                                    </span>
                                ))}
                            </div>
                            <span className="percentage-symbol text-[18vw] md:text-[15vw] leading-[1] text-white font-semibold tracking-tight h-[18vw] md:h-[15vw] flex items-center">%</span>
                        </div>
                        <span className="static-fade-text opacity-0 invisible absolute -bottom-10 md:-bottom-16 text-[#171717] right-2 lg:right-0 font-semibold text-sm md:text-lg whitespace-nowrap">
                            Of the original purchase cost
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;