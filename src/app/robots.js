import { APP_URL } from "@yeardle/constants/AppConfig";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/"
    },
    sitemap: `${APP_URL}/sitemap.xml`
  };
}
