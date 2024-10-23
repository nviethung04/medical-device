import { DailyGameIcon, PracticeUnlimitedIcon, HowToPlayIcon, ContactIcon } from "./AppIconSvg";

export const MARKETING_LINK = ["/contact", "/privacy-policy", "how-to-play"];
// Seting for using env file

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
export const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY;
export const CRYPTO_IV = process.env.NEXT_PUBLIC_CRYPTO_IV;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/yeardle",
  twitter: "https://x.com/yeardle",
  instagram: "https://www.instagram.com/yeardle",
  pinterest: "https://www.pinterest.com/yeardle",
  email: "yeadergame@gmail.com",
  author: "The Yeardle Team",
  feedBackLink: ""
};

export const LINK_DATA = [
  {
    url: "/",
    name: "Tổng quan",
    icon: DailyGameIcon
  }
];

export const GAME_RECOMMEND = [];
