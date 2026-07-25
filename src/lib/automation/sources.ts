function isIpLiteral(hostname: string): boolean {
  return (
    /^\d{1,3}(?:\.\d{1,3}){3}$/u.test(hostname) ||
    hostname.includes(":")
  );
}

export function normalizeApprovedUrl(
  value: string,
  allowedHosts: ReadonlySet<string>,
): URL {
  const url = new URL(value);
  if (url.protocol !== "https:") {
    throw new Error("Source URL must use HTTPS");
  }
  if (isIpLiteral(url.hostname)) {
    throw new Error("Source URL may not use an IP literal");
  }
  if (!allowedHosts.has(url.hostname)) {
    throw new Error(`Source host is not in the allowlist: ${url.hostname}`);
  }
  url.hash = "";
  return url;
}

export interface SourceExcerpt {
  title: string;
  url: string;
  excerpt: string;
}

export function serializeSourceExcerpts(
  sources: readonly SourceExcerpt[],
  allowedHosts: ReadonlySet<string>,
): string[] {
  return sources.map((source) => {
    const url = normalizeApprovedUrl(source.url, allowedHosts);
    const excerpt = source.excerpt.replace(/\s+/gu, " ").trim().slice(0, 2_000);
    return `${source.title}\n${url.href}\n${excerpt}`;
  });
}
