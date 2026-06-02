'use client'
import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const MapSection = () => {
    const containerRef = useRef(null)
    const mapRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                scrub: 1,
                pin: true,
            }
        });



        tl.fromTo(".map-section-content",
            { scale: 2, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 1, ease: 'power2.inOut' },
            0
        )

            .to(mapRef.current, {
                x: '-10vw',
                ease: "none",
                duration: 2
            });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className='h-screen w-full relative bg-black overflow-hidden'>
            <div className="map-section-content w-full h-full absolute inset-0" style={{ opacity: 0, transform: 'scale(2)' }}>
                <img ref={mapRef} src="/images/Maps.svg" alt="" className='w-full h-full object-cover scale-150 -translate-y-80 translate-x-180' />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
                    <Image src="/images/Globe.svg" alt="" width={100} height={100} className="mx-auto pb-10" />
                    <h3 className='text-white text-2xl md:text-3xl lg:text-4xl text-center px-6'>OR wherever You Are In The world,<br />We Can Buy Dead Stock From You</h3>
                </div>
            </div>
        </div>
    )
}

export default MapSection