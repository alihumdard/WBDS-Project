const LEGACY_URL_MAP = new Map([
  ["/about-we-buy-dead-stocks", "/about"],
  ["/services/free-valuation-services", "/get-free-valuation-dead-stocks"],
  ["/service/free-valuation-services", "/get-free-valuation-dead-stocks"],
  ["/services/electronics-scrap-buyer-in-dubai", "/services/electronics-scrap"],
  ["/service/electronics-scrap-buyer-in-dubai", "/services/electronics-scrap"],
  ["/services/computer-scrap-buyer-in-dubai", "/services/computer-scrap"],
  ["/service/computer-scrap-buyer-in-dubai", "/services/computer-scrap"],
  ["/author/admin", "/Blogs"],
  ["/services/category/dead-stock", "/Blogs"],
  ["/service/category/dead-stock", "/Blogs"],
  ["/services/free-collection-in-uae-convenient-solutions", "/services/free-collection"],
  ["/service/free-collection-in-uae-convenient-solutions", "/services/free-collection"],
  ["/services/free-collection-service-a-game-changer-for-you", "/services/free-collection"],
  ["/service/free-collection-service-a-game-changer-for-you", "/services/free-collection"],
  ["/services/scrap-is-gold-unlocking-hidden-value-of-waste", "/services/e-waste"],
  ["/service/scrap-is-gold-unlocking-hidden-value-of-waste", "/services/e-waste"],
  ["/interest", "/get-free-valuation-dead-stocks"],
]);

const INTERNAL_HREF_PATTERN = /href=(["'])https?:\/\/(?:www\.)?webuydeadstocks?\.com\/?([^"']*)\1/gi;

function normalizeInternalPath(rawPath) {
  const pathOnly = rawPath.split("#")[0].split("?")[0].replace(/\/+$/, "");
  const suffix = rawPath.slice(pathOnly.length);
  const path = pathOnly ? `/${pathOnly}` : "/";

  if (path.startsWith("/wp-content") || path.startsWith("/uploads")) {
    return null;
  }

  return `${LEGACY_URL_MAP.get(path) || path}${suffix}`;
}

export function replaceOutdatedInternalHrefs(html = "") {
  if (!html) return html;

  return html.replace(INTERNAL_HREF_PATTERN, (match, quote, rawPath) => {
    const updatedPath = normalizeInternalPath(rawPath);
    return updatedPath ? `href=${quote}${updatedPath}${quote}` : match;
  });
}
