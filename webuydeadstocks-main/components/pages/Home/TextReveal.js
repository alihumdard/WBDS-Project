"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TextReveal = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    const text =
        "We Buy Dead Stocks is the leading dead stock buyer in the UAE and GCC region. With over 21 years of turning non- moving inventory into cash for businesses,startups and manufacturers, we have solidified ourselves as the most trusted choice in the region. We deal in B2B by buying non-moving/dead stock from companies in the GCC and export them to developing countries across the globe, all the while promising 100% privacy for the company's image and brand name.";

    useGSAP(
        () => {
            let mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                const words = textRef.current.querySelectorAll(".word");
                gsap.to(words, {
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        end: "bottom 60%",
                        scrub: 1,
                    },
                    color: "#222222",
                    stagger: 0.1,
                });
            });

            mm.add("(min-width: 768px)", () => {
                const words = textRef.current.querySelectorAll(".word");
                gsap.to(words, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        end: "top top",
                        scrub: 1,
                    },
                    color: "#222222",
                    stagger: 0.1,
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen md:h-screen bg-white py-[20.5vw] px-[6.1vw] md:px-[3.3vw] 2xl:px-16 md:py-[4.1vw] 2xl:py-20 flex flex-col items-center"
        >
            <div className="w-full h-full flex flex-col mx-auto flex-grow">
                <h2 className="text-[#222222] text-[7.7vw] md:text-[2.2vw] 2xl:text-[42px] font-bold mb-[4.1vw] md:mb-[0.8vw] 2xl:mb-4 tracking-tight">
                    Quick, Simple, & Guaranteed
                </h2>
                <div className="w-full h-[1px] bg-gray-300 mt-[6.1vw] md:mt-[1.25vw] 2xl:mt-6 mb-[8.2vw] md:mb-[1.6vw] 2xl:mb-8"></div>
                <p
                    ref={textRef}
                    className="text-[5vw] md:text-[1vw] 2xl:text-[1.8vw] leading-[1.4] md:leading-[1.3] font-normal text-[#e5e7eb] mb-[1vw] md:mb-[6.6vw] 2xl:mb-32"
                >
                    {text.split(" ").map((word, index) => (
                        <span key={index} className="word inline-block mr-[1.5vw] md:mr-[0.5vw] 2xl:mr-[10px]">
                            {word}
                        </span>
                    ))}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-[10vw] gap-x-[5vw] md:gap-[1.25vw] 2xl:gap-6 w-full">
                    <div className="flex flex-col">
                        <span className="text-[#7ED957] text-[9.2vw] md:text-[2.4vw] 2xl:text-[46px] font-bold mb-[2vw] md:mb-[0.4vw] 2xl:mb-2">
                            21+
                        </span>
                        <p className="text-gray-600 text-[4.6vw] md:text-[1vw] 2xl:text-[20px] font-normal">
                            Year of Experience
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#7ED957] text-[9.2vw] md:text-[2.4vw] 2xl:text-[46px] font-bold mb-[2vw] md:mb-[0.4vw] 2xl:mb-2">
                            3359+
                        </span>
                        <p className="text-gray-600 text-[4.6vw] md:text-[1vw] 2xl:text-[20px] font-normal">
                            Dead Stocks Cleared
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#7ED957] text-[9.2vw] md:text-[2.4vw] 2xl:text-[46px] font-bold mb-[2vw] md:mb-[0.4vw] 2xl:mb-2">
                            15+
                        </span>
                        <p className="text-gray-600 text-[4.6vw] md:text-[1vw] 2xl:text-[20px] font-normal">
                            Countries Served in The
                            <br className="hidden md:block" /> GCC & Worldwide
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#7ED957] text-[9.2vw] md:text-[2.4vw] 2xl:text-[46px] font-bold mb-[2vw] md:mb-[0.4vw] 2xl:mb-2">
                            04
                        </span>
                        <p className="text-gray-600 text-[4.6vw] md:text-[1vw] 2xl:text-[20px] font-normal">
                            Offices Worldwide
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TextReveal;

