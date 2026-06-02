import { Smile, Handshake, Lightbulb } from "lucide-react";

const TrustedSection = () => {
    return (
        <section className="w-full h-fit bg-white py-16 md:py-20 lg:py-24">
            <div className="w-full mx-auto flex flex-col h-auto justify-center px-4 sm:px-20 lg:px-20 gap-12 md:gap-[25vh]">
                <h2 className="text-3xl md:text-5xl lg:text-[54px] leading-[1.3] md:leading-[1.2] text-[#333333] mt-4 md:mt-0 break-words">
                    Trusted By <span className="font-bold text-[#6CC24A]">Startups, Manufacturers,</span>
                    <br className="hidden md:block" />
                    <span className="font-bold text-[#6CC24A]">Traders</span> &{" "}
                    <span className="font-bold text-[#6CC24A]">Distributors</span> for 21+ Years
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="flex flex-col md:pr-12 lg:pr-16 md:border-r border-gray-200 pb-10 md:pb-0">
                        <Smile className="w-12 h-12 text-[#0BA360] mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-[22px] font-bold text-[#222222] mb-4 tracking-wide leading-snug">
                            THOUSANDS OF HAPPY CLIENTS
                        </h3>
                        <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-light">
                            We have been a leading deadstock buyer in the GCC region for decades and have earned the trust of many businesses for delivering quality services.
                        </p>
                    </div>
                    <div className="flex flex-col md:px-12 lg:px-16 md:border-r border-gray-200 py-10 md:py-0 border-t md:border-t-0">
                        <Handshake className="w-12 h-12 text-[#0BA360] mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-[22px] font-bold text-[#222222] mb-4 tracking-wide leading-snug">
                            FAIR & HONEST DEALS
                        </h3>
                        <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-light">
                            Our transparent, market-value-based evaluation process ensures you get maximum value for your surplus or dead inventory.
                        </p>
                    </div>
                    <div className="flex flex-col md:pl-12 lg:pl-16 pt-10 md:pt-0 border-t md:border-t-0 border-gray-200">
                        <Lightbulb className="w-12 h-12 text-[#0BA360] mb-6" strokeWidth={1.5} />
                        <h3 className="text-xl md:text-[22px] font-bold text-[#222222] mb-4 tracking-wide leading-snug">
                            TAILORED SOLUTIONS FOR YOUR NEEDS
                        </h3>
                        <p className="text-gray-600 text-[15px] md:text-base leading-relaxed font-light">
                            Inventory never comes equal. That is why we tailor our inventory liquidation services to meet your unique needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedSection;