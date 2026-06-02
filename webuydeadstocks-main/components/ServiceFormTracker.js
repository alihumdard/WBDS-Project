"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { trackCtaClick } from "@/components/analytics";

const getFieldValue = (form, matcher) => {
  const fields = Array.from(form.querySelectorAll("input, textarea, select"));
  const field = fields.find((element) => {
    const haystack = [
      element.name,
      element.type,
      element.placeholder,
      element.getAttribute("aria-label"),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matcher(haystack, element);
  });

  return field?.value?.trim() || "";
};

const getSubmitLabel = (form) => {
  const submitter = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
  return submitter?.textContent?.trim() || submitter?.value?.trim() || "Service Form Submit";
};

const getCtaLabel = (element) => {
  const text = element.textContent?.replace(/\s+/g, " ").trim();
  const href = element.getAttribute("href") || "";

  if (text) return text;
  if (href.startsWith("tel:")) return "Call Now";
  if (href.startsWith("mailto:")) return "Email";
  if (href.includes("instagram")) return "Instagram";
  if (href.includes("linkedin")) return "LinkedIn";
  if (href.includes("facebook")) return "Facebook";
  if (href.includes("contact")) return "Contact Us";
  if (href.includes("valuation")) return "Get Free Valuation";

  return "Service CTA";
};

const isTrackableServiceCta = (element) => {
  const href = element.getAttribute("href") || "";
  const label = getCtaLabel(element).toLowerCase();
  const signal = `${label} ${href}`.toLowerCase();

  return (
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    signal.includes("contact") ||
    signal.includes("call now") ||
    signal.includes("get free valuation") ||
    signal.includes("valuation") ||
    signal.includes("get quote") ||
    signal.includes("book a call") ||
    signal.includes("schedule") ||
    signal.includes("instagram") ||
    signal.includes("linkedin") ||
    signal.includes("facebook")
  );
};

export default function ServiceFormTracker({ serviceTitle }) {
  const router = useRouter();

  useEffect(() => {
    const serviceHtml = document.querySelector("[data-service-html]");
    if (!serviceHtml) return;

    const forms = Array.from(serviceHtml.querySelectorAll("form"));

    emailjs.init("m3_cXcrmA8tRDUV6B");

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
      const originalText = submitButton?.tagName === "INPUT" ? submitButton.value : submitButton?.textContent;

      if (submitButton) {
        submitButton.disabled = true;
        if (submitButton.tagName === "INPUT") {
          submitButton.value = "Sending...";
        } else {
          submitButton.textContent = "Sending...";
        }
      }

      const message = getFieldValue(form, (text, element) => element.tagName === "TEXTAREA" || text.includes("message"));
      const description = getFieldValue(form, (text) => text.includes("describe") || text.includes("what you have"));
      const subject = getFieldValue(form, (text) => text.includes("subject")) || description || message || getSubmitLabel(form);

      const templateParams = {
        name: getFieldValue(form, (text) => text.includes("name")),
        email: getFieldValue(form, (text, element) => element.type === "email" || text.includes("email")),
        phone: getFieldValue(form, (text, element) => element.type === "tel" || text.includes("phone") || text.includes("contact")),
        subject,
      };

      try {
        await emailjs.send("service_79d4mlb", "template_e3zu3dp", templateParams);

        const submissionId = Date.now().toString();
        window.sessionStorage.setItem("wbds_form_conversion_pending", submissionId);
        window.gtag?.("event", "form_submit", {
          event_category: "Service Form",
          event_label: serviceTitle,
          form_name: getSubmitLabel(form),
          page_url: window.location.href,
          submission_id: submissionId,
        });

        router.push("/thank-you");
      } catch (error) {
        console.error("Service form send error:", error);
        alert("Error sending message. Please try again later.");

        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.tagName === "INPUT") {
            submitButton.value = originalText || "Submit";
          } else {
            submitButton.textContent = originalText || "Submit";
          }
        }
      }
    };

    const handleClick = (event) => {
      const cta = event.target.closest("a, button");
      if (!cta || !serviceHtml.contains(cta)) return;
      if (cta.closest("form")) return;
      if (!isTrackableServiceCta(cta)) return;

      trackCtaClick({
        buttonName: getCtaLabel(cta),
        location: `Service Page - ${serviceTitle}`,
        category: cta.href?.includes("instagram") || cta.href?.includes("linkedin") || cta.href?.includes("facebook") ? "Social" : "CTA",
        linkUrl: cta.href || cta.getAttribute("href"),
      });
    };

    forms.forEach((form) => form.addEventListener("submit", handleSubmit));
    serviceHtml.addEventListener("click", handleClick);

    return () => {
      forms.forEach((form) => form.removeEventListener("submit", handleSubmit));
      serviceHtml.removeEventListener("click", handleClick);
    };
  }, [router, serviceTitle]);

  return null;
}
