import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.dishadance.com";
const SITE_NAME = "Disha's Dance Academy";

type PageSeo = {
  title: string;
  description: string;
  // Keep the page out of Google (checkout, admin, etc.)
  noindex?: boolean;
};

// Edit page titles & descriptions here. Keep titles under ~60 characters
// and descriptions under ~155 so Google doesn't cut them off.
const PAGES: Record<string, PageSeo> = {
  "/": {
    title: "Disha's Dance Academy — Online Dance Classes for Women & Kids in India",
    description:
      "Ghar baithe seekho Bollywood aur Hip-Hop dance. 500+ happy students. Beginner-friendly classes for women & kids. Join Disha's Dance Academy today!",
  },
  "/contact": {
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Questions about our online Bollywood & Hip-Hop dance classes for women and kids? Send us a message and we'll reply on WhatsApp.",
  },
  "/terms": {
    title: `Terms & Conditions | ${SITE_NAME}`,
    description:
      "Terms for enrolling in Disha's Dance Academy online classes: plans, pricing in INR, payments via Razorpay, class validity and refunds.",
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      "How Disha's Dance Academy collects, uses and protects your details when you enroll in or enquire about our online dance classes.",
  },
  "/checkout": {
    title: `Checkout | ${SITE_NAME}`,
    description: "Complete your enrollment in Disha's Dance Academy online dance classes.",
    noindex: true,
  },
  "/thank-you": {
    title: `Thank You | ${SITE_NAME}`,
    description: "Your enrollment in Disha's Dance Academy is confirmed.",
    noindex: true,
  },
  "/admin": {
    title: `Admin | ${SITE_NAME}`,
    description: "",
    noindex: true,
  },
};

const NOT_FOUND: PageSeo = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: "",
  noindex: true,
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    const page = PAGES[path] ?? NOT_FOUND;
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", page.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", url);
    setCanonical(url);
  }, [pathname]);

  return null;
};

export default RouteSeo;
