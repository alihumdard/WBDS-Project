"use client";
import { useEffect, useRef } from "react";


export default function HtmlDirUpdater({ lang }) {
  const prevLangRef = useRef(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";


    const domain = window.location.hostname;
    const gLang = lang === "ar" ? "ar" : "en";
    
    document.cookie = `googtrans=/en/${gLang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${gLang}; path=/; domain=.${domain}`;

    const select = document.querySelector(".goog-te-combo");
    if (select && select.value !== gLang) {
      select.value = gLang;
      select.dispatchEvent(new Event("change"));
    }

    if (prevLangRef.current !== lang) {
      window.location.reload();
    }
    prevLangRef.current = lang;
  }, [lang]);

  return null;
}
