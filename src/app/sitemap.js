import { APP_URL } from "@yeardle/constants/AppConfig";

export default function sitemap() {
  return [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${APP_URL}/practice-unlimited`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${APP_URL}/how-to-play`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${APP_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${APP_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    }
  ];
}
