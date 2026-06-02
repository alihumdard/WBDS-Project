'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        id: 1,
        number: '01',
        title: 'TELL US WHAT YOU HAVE IN STOCK',
        desc: 'Fill in our inventory evaluation form, or simply schedule a meeting with us.',
        image: '/Assets/MapImg/Step-1.webp'
    },
    {
        id: 2,
        number: '02',
        title: 'WE WILL MAKE AN OFFER YOU CANNOT REFUSE',
        desc: "We'll evaluate your inventory for free and provide you with a cash offer",
        image: '/Assets/MapImg/Step-2.webp'
    },
    {
        id: 3,
        number: '03',
        title: 'WE PICK UP YOUR DEAD STOCK ON TIME',
        desc: "Happy with our offer? We'll arrange pickup for you.",
        image: '/Assets/MapImg/Step-3.webp'
    },
    {
        id: 4,
        number: '04',
        title: 'CASH IS DEPOSITED STRAIGHT TO YOUR ACCOUNT',
        desc: 'Cash Is Deposited Straight To Your Account',
        image: '/Assets/MapImg/Step-4.webp'
    }
];

const OurProcess = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const headingRef = useRef(null);
    const numbersContainerRef = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 767px)",
            isDesktop: "(min-width: 768px)"
        }, (context) => {
            let { isMobile } = context.conditions;
            let shift = isMobile ? 25 : 40;
            let headingY = isMobile ? -100 : -150;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=300%',
                    scrub: 1,
                    pin: true,
                }
            });

            cardsRef.current.forEach((card, index) => {
                if (index === 0) return;

                gsap.set(card, { y: '100%' });

                tl.to(card, {
                    y: index * shift,
                    duration: 1,
                    ease: 'none'
                }, index - 1);
            });

            tl.to(headingRef.current, {
                y: headingY,
                opacity: 0,
                duration: 1,
                ease: 'none'
            }, 0);

            tl.to(numbersContainerRef.current, {
                yPercent: -25,
                duration: 1,
                ease: 'none'
            }, 0);

            tl.to(numbersContainerRef.current, {
                yPercent: -50,
                duration: 1,
                ease: 'none'
            }, 1);

            tl.to(numbersContainerRef.current, {
                yPercent: -75,
                duration: 1,
                ease: 'none'
            }, 2);
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full bg-black text-white h-screen overflow-hidden">
            <div ref={headingRef} className="absolute top-10 left-6 md:top-20 md:left-20 z-50">
                <h2 className="text-white text-[40px] md:text-[80px] font-black leading-[1.05] uppercase tracking-tighter">
                    Our<br />Process
                </h2>
            </div>

            <div className="absolute left-6 md:left-20 bottom-[40px] md:bottom-[60px] z-50 h-[60px] md:h-[100px] overflow-hidden">
                <div ref={numbersContainerRef} className="flex flex-col">
                    {items.map((item) => (
                        <span key={item.id} className="text-white text-[60px] md:text-[100px] font-black leading-[60px] md:leading-[100px] h-[60px] md:h-[100px] flex items-center">
                            {item.number}
                        </span>
                    ))}
                </div>
            </div>

            <div ref={containerRef} className="relative w-full h-full flex">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        ref={el => cardsRef.current[index] = el}
                        className="absolute inset-0 w-full h-[100vh] bg-black"
                        style={{
                            zIndex: index + 1,
                            borderTopLeftRadius: index > 0 ? 'clamp(24px, 5vw, 40px)' : '0',
                            borderTopRightRadius: index > 0 ? 'clamp(24px, 5vw, 40px)' : '0',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="absolute right-0 top-0 w-full md:w-[80%] h-full">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover grayscale opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 md:via-black/40 to-transparent w-[90%] md:w-1/2"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:via-black/20 to-transparent"></div>
                        </div>

                        <div
                            className={`absolute right-6 md:right-20 flex flex-col items-end text-right z-20 max-w-[90vw] md:max-w-[550px]
                                ${index === 0 ? 'bottom-[40px] md:bottom-[60px]' : ''}
                                ${index === 1 ? 'bottom-[65px] md:bottom-[100px]' : ''}
                                ${index === 2 ? 'bottom-[90px] md:bottom-[140px]' : ''}
                                ${index === 3 ? 'bottom-[115px] md:bottom-[180px]' : ''}
                            `}
                        >
                            <h3 className="text-[#6FC128] text-[26px] sm:text-[30px] md:text-[54px] font-black uppercase mb-3 md:mb-4 leading-[1.05]">
                                {item.title}
                            </h3>
                            <p className="text-white text-[15px] md:text-xl font-medium w-full">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurProcess;