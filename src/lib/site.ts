export const SITE_URL = "https://alphaspeedai.com";

export function buildCanonicalUrl(pathname: string): string {
  if (!pathname || pathname === "/") {
    return `${SITE_URL}/`;
  }

  const normalizedPath = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${SITE_URL}/${normalizedPath}/`;
}
