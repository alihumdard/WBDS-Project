"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
    useEffect(() => {

        if (!window.googleTranslateElementInit) {
            window.googleTranslateElementInit = () => {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        includedLanguages: "en,ar",
                        autoDisplay: false,
                    },
                    "google_translate_element"
                );
            };

            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return <div id="google_translate_element" style={{ display: "none" }}></div>;
}

export const switchLanguage = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
    } else {

        const domain = window.location.hostname;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
        document.cookie = `googtrans=/en/${lang}; path=/; domain=.${domain}`;

    }
};
