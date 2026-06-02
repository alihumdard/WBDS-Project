import Landing from "@/components/pages/Home/Landing";
import LatestBlogs from "@/components/pages/Home/LatestBlogs";
import TextReveal from "@/components/pages/Home/TextReveal";
import Services from "@/components/pages/Home/Services";
import Pricing from "@/components/pages/Home/Pricing";
import TrustedSection from "@/components/pages/Home/TrustedSection";
import OurProcess from "@/components/pages/Home/OurProcess";
import Recycling from "@/components/pages/Home/Recycling";
import MapSection from "@/components/pages/Home/MapSection";
import ScrollMaps from "@/components/pages/Home/ScrollMaps";
import LenisResizer from "@/components/LenisResizer";

export const metadata = {
  title: {
    absolute: "We Buy Dead Stocks | Dead stock buyer in the UAE and GCC",
  },
  description:
    "We Buy Dead Stocks is a leading dead stock buyer in the UAE and GCC region. We purchase surplus inventory, expired goods, and excess stock.",
  alternates: {
    canonical: "https://webuydeadstocks.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const page = () => {
  return (
    <div>
      <Landing />
      <TextReveal />
      <ScrollMaps />
      <OurProcess />
      <Services />
      <Pricing />
      <TrustedSection />
      <Recycling />
      <LatestBlogs />
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Dead Stock Liquidation Service",
        "description": "We Buy Dead Stocks provides bulk liquidation, surplus inventory purchase, and non-moving stock valuation for companies across the UAE and GCC.",
        "provider": {
          "@type": "LocalBusiness",
          "name": "We Buy Dead Stocks",
          "url": "https://webuydeadstocks.com",
          "telephone": "+97165390377",
          "email": "info@webuydeadstocks.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Street no:19 - Industrial Area 3",
            "addressLocality": "Sharjah",
            "addressRegion": "Sharjah",
            "postalCode": "31146",
            "addressCountry": "AE"
          }
        },
        "serviceType": [
          "Dead Stock Liquidation",
          "Surplus Inventory Purchase",
          "Bulk Inventory Valuation",
          "Non-moving Stock Clearance",
          "Export of Bulk Lots"
        ],
        "areaServed": [
          {"@type":"Country","name":"United Arab Emirates"},
          {"@type":"Country","name":"Saudi Arabia"},
          {"@type":"Country","name":"Qatar"},
          {"@type":"Country","name":"Kuwait"},
          {"@type":"Country","name":"Bahrain"},
          {"@type":"Country","name":"Oman"}
        ],
        "url": "https://webuydeadstocks.com/"
      })
    }}
  />

          <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "We Buy Dead Stocks",
            "url": "https://webuydeadstocks.com/",
            "description": "We Buy Dead Stocks is a leading dead stock buyer in the UAE and GCC region.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://webuydeadstocks.com/services/{search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

  
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "We Buy Dead Stocks",
        "image": "https://webuydeadstocks.com/logo.png",
        "@id": "https://webuydeadstocks.com/#business",
        "url": "https://webuydeadstocks.com/",
        "telephone": "+971 6 539 0377",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Street No.19, Industrial Area 3",
          "addressLocality": "Sharjah",
          "postalCode": "00000",
          "addressCountry": "AE",
          "addressRegion": "SH"
        },
        "priceRange": "$$",
        "sameAs": [
          "https://www.instagram.com/webuydeadstocks/",
          "https://www.linkedin.com/company/webuydeadstocks/",
          "https://www.facebook.com/webuydeadstocks/"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Saturday",
              "Friday",
              "Thursday",
              "Wednesday",
              "Tuesday",
              "Monday"
            ],
            "opens": "08:00",
            "closes": "18:00"
          }
        ]
      })
    }}
  />
  <LenisResizer />
    </div>
  )
}

export default page