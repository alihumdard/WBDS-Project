import ClientLayout from "./clientLayout";
import Navbar from "@/components/Partials/Navbar";
import Footer from "@/components/Partials/Footer";
import GoogleTranslate from "@/components/GoogleTranslate";
import HtmlDirUpdater from "@/components/i18n/HtmlDirUpdater";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://webuydeadstocks.com"),
  description: "We Buy Dead Stocks is a leading dead stock buyer in the UAE and GCC region.",
  robots: { index: true, follow: true },
};



export default async function LangLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1443902503720485');
              fbq('track', 'PageView');
            `,
          }}
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "We Buy Dead Stocks",
              url: "https://webuydeadstocks.com",
              logo: "https://webuydeadstocks.com/images/logo.png",
              sameAs: [
                "https://www.facebook.com/webuydeadstocks/",
                "https://www.instagram.com/webuydeadstocks",
                "https://www.linkedin.com/company/chaudary-anwar-tr.-co-llc/",
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var domain = window.location.hostname;
                var gLang = "${lang === 'ar' ? 'ar' : 'en'}";
                if (gLang === 'en') {
                  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain;
                  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domain;
                  document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  document.cookie = "googtrans=/en/en; path=/; domain=" + domain;
                  document.cookie = "googtrans=/en/en; path=/; domain=." + domain;
                  document.cookie = "googtrans=/en/en; path=/;";
                } else {
                  document.cookie = "googtrans=/en/ar; path=/; domain=" + domain;
                  document.cookie = "googtrans=/en/ar; path=/; domain=." + domain;
                  document.cookie = "googtrans=/en/ar; path=/;";
                }
              })();
            `
          }}
        />
      </head>
      <body className={montserrat.variable}>
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `
          }}
        />
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `
            }}
          />
        )}
        <noscript>
          <img height="1" width="1" style={{ display: "none" }} alt=""
            src="https://www.facebook.com/tr?id=1443902503720485&ev=PageView&noscript=1"
          />
        </noscript>
        
        <HtmlDirUpdater lang={lang} />
        <ClientLayout>
          <GoogleTranslate />
          <Navbar lang={lang} />
          {children}
          <Footer lang={lang} />
        </ClientLayout>
      </body>
    </html>
  );
}
