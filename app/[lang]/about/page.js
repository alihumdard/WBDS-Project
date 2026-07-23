'use client';

import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      
      <section className="relative h-[600px] md:h-[700px] bg-gradient-to-r from-gray-800 to-gray-600 overflow-hidden">
        
        <div className="absolute inset-0">
          <img
            src="/images/back.webp"
            alt="Warehouse"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        
        <div className="relative h-full w-full mx-auto px-6 sm:px-20 lg:px-20">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="text-white">
              <h2 className="text-2xl sm:text-3xl max-w-lg mb-4 leading-tight">
                21+ Years Of Turning Non-Moving Stock Into Instant Cash
              </h2>
            </div>

            
            <div className="text-white">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                About Us
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                Established in 2003, We Buy Dead Stocks is a leading dead stock buyer in
                the UAE and GCC region. Our mission is simple: to help businesses recover
                their losses by turning surplus and non-moving inventory into immediate
                cash. Since our establishment, we've helped businesses across 15+ countries
                clear their warehouses, reclaim their space and unlock the hidden value in
                their non-moving stock with our inventory liquidation services in the GCC
                and beyond. Let us do the same for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full mx-auto px-6 sm:px-20 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trust Us, We're Experts At Dead Stock Liquidation
              </h2>

              <p className="text-black font-medium text-lg mb-6 leading-relaxed">
                We understand that every client's product is different, and that is
                why our dead stock liquidation evaluations are never cookie-
                cutter. For over two decades, we've been conducting transparent
                valuations based on both market value and the condition of your
                stock. The result? Fair and honest deals for our clients.
              </p>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                To us, it's not just about buying stock at the best price but also
                helping you recover as much as you can from your dead stock
                liquidation in the GCC.
              </p>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Whether You're A Manufacturer, Distributor, Or Start-up, Our Solutions Are Made For You
              </h3>

              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We accept more than 20 types of non-moving inventory, from
                electronic scrap and cosmetics to building materials and
                everything in between. Whatever you have in stock, our
                liquidation buyers will take it off your hands.
              </p>

              <p className="text-gray-700 text-lg">
                Learn more about our founder and CEO,{' '}
                <Link href="/contact" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
                  Hashim Chaudhary
                </Link>
                , who has over 21 years of experience in dead stock liquidation and
                sustainable waste management.
              </p>
            </div>

            
            <div className="relative h-[300px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl mt-8 lg:mt-0">
              <img
                src="/images/desc.webp"
                alt="Warehouse Manager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      
      <section className="relative py-32 md:py-40 overflow-hidden">
        
        <div className="absolute inset-0">
          <img
            src="/images/OurCommit.webp"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        
        <div className="relative w-full mx-auto px-6 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our commitment to sustainability
            </h2>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Being in the scrap business, we deeply believe in sustainability and
              make sure that all the scrap we deal in is recycled or disposed of in an
              eco-friendly manner. We abide by local laws and regulations while also
              following environmental guidelines.
            </p>
          </div>
        </div>
      </section>

      
      <section className="relative py-24 md:py-32 overflow-hidden bg-black/90 px-6 sm:px-0">
        
        <div className="relative text-center mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-8 leading-tight">
            Too Much Stock And Not Enough Space?
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            We Have You Covered
          </h2>
          <Link
            href="https://www.webuydeadstock.com/get-free-valuation-dead-stocks"
            className="inline-block bg-white text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            target="_blank"
          >
            Get Free Valuation
          </Link>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 px-6 sm:px-20 md:py-28 bg-white">
        <div className="w-full mx-auto px-0 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-600 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                THOUSANDS OF HAPPY CLIENTS
              </h3>
              <p className="text-black font-medium text-lg leading-relaxed">
                We have been a leading deadstock buyer in the GCC region for decades and have
                earned the trust of many businesses for delivering quality services.
              </p>
            </div>

            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-600 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Mصافحة M7 16l-4-4m0 0l4-4m-4 4h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                FAIR & HONEST DEALS
              </h3>
              <p className="text-black font-medium text-lg leading-relaxed">
                Our transparent, market-value-based evaluation process ensures you get
                maximum value for your surplus or dead inventory.
              </p>
            </div>

            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-green-600 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                TAILORED SOLUTIONS FOR YOUR NEEDS
              </h3>
              <p className="text-black font-medium text-lg leading-relaxed">
                Inventory never comes equal. That is why we tailor our inventory liquidation services
                to meet your unique needs.
              </p>
            </div>
          </div>

          
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block border-2 border-gray-900 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
            >
              Contact US
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Us - We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/about",
            "description": "Established in 2003, We Buy Dead Stocks is a leading dead stock buyer in the UAE and GCC region.",
            "publisher": {
              "@type": "Organization",
              "name": "We Buy Dead Stocks"
            }
          })
        }}
      />
    </div>
  );
}
