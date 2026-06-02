"use client";

export const trackCtaClick = ({
  buttonName,
  location,
  category = "CTA",
  linkUrl,
}) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "cta_click", {
    event_category: category,
    event_label: location ? `${buttonName} - ${location}` : buttonName,
    button_name: buttonName,
    button_location: location,
    page_url: window.location.href,
    page_path: window.location.pathname,
    link_url: linkUrl,
  });
};
