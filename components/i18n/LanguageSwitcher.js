"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    if (pathname === "/arabic" || pathname.startsWith("/arabic/")) {
      setCurrentLang("ar");
    } else {
      setCurrentLang("en");
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    

    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;


    let newPath;
    if (newLang === "ar") {


      newPath = pathname === "/" ? "/arabic" : `/arabic${pathname}`;
    } else {


      newPath = pathname.replace(/^\/arabic/, "") || "/";
    }

    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2 font-semibold text-sm rounded transition-colors ${
        currentLang === "ar" 
          ? "bg-[#8CC63F] text-white" 
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      }`}
    >
      {currentLang === "en" ? "العربية" : "English"}
    </button>
  );
}
