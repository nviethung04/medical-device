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
    name: "Daily Game",
    icon: DailyGameIcon
  },
  {
    url: "/practice-unlimited",
    name: "Practice Unlimited",
    icon: PracticeUnlimitedIcon
  },
  {
    url: "/how-to-play",
    name: "How to Play",
    icon: HowToPlayIcon
  },
  {
    url: "/contact",
    name: "Contact Us",
    icon: ContactIcon
  }
  // {
  //   url: "/",
  //   name: "Community",
  //   icon: CommunityIcon
  // }
];

export const OTHER_GAMES = [
  {
    url: "/yeardle",
    name: "Yeardle",
    logo: "/images/LOG/timedle-logo.png"
  },
  {
    url: "/yeardle-unlimited",
    name: "Yeardle Unlimited",
    logo: "/images/LOG/timedle-logo.png"
  }
];

export const GAME_RECOMMEND = [
  {
    url: "/yeardle",
    image: "/images/games/countryle-game-background.png",
    title: "Yeardle",
    description: "Guess year of the event"
  }
];

export const HOME_FAQS = [
  {
    question: "When is a new game available?",
    answer:
      "A new game is available every day at 0:00 am, your device's local time! Everyone plays the same game on the same day. There is one daily game per day. If you don't want to wait, try practice unlimited mode."
  },
  {
    question: "Can I play more than one game?",
    answer:
      "Each game only has one new game a day for daily mode, which resets at midnight GMT. However, Each game has practice unlimited mode, so you can play as much as you want."
  },
  {
    question: "How do I share my results?",
    answer:
      "When you solve the daily game, you can click the share button to share your success with your friends. The share button saves your result in your clipboard. You should be able to paste it into any other application you want to share."
  },
  {
    question: "Is the game's data correct and updated?",
    answer:
      "Yes, we are updating our data as quickly and as accurately as possible. All countries' borders, capital cities, and maps can change over time. The game can make some mistakes that are completely unintentional and not a political statement of any kind. We appreciate the feedback and will fix all issues as we learn about them."
  },
  {
    question: "How are countries and territories picked?",
    answer:
      "Every day, a country or territory is picked randomly! So, it will continue to pick a random one every day, forever!."
  },
  {
    question: "What happens if I run out of guesses?",
    answer:
      "If you use all your guesses without identifying the correct country, the game ends, and the correct answer is revealed."
  },
  {
    question: "Where can I find the previous game?",
    answer:
      "It's impossible to find them online, but you can find them in the Internet Archive! Rather than that, you can try practice unlimited game mode."
  },
  {
    question: "Can I challenge my friends?",
    answer:
      "Certainly! Just share our website with your friends. You can also find sharing buttons after finishing the daily game."
  },
  {
    question: "How is my progress saved?",
    answer:
      "Your game statistic is automatically saved in your browser's local storage, which might be lost if you clear your browser data. It would help if you used the export data function to save your game statistics. By doing that, You can also transfer your data to other devices."
  },
  {
    question: "I encountered a bug. What should I do?",
    answer:
      "If you encounter a bug, try refreshing your browser. If the issue persists, please give us feedback on the contact page. Our team will fix it as soon as we find the issue."
  },
  {
    question: "How can I install Timedle on my phone?",
    answer:
      'There is no application (yet) for Timedle on the App Store or Google Play, but our web pages were optimized for mobile users. If you want to install the web page on your phone, you can find an option on your browser called "Add to home screen" or something similar!'
  },
  {
    question: "Are there any system requirements?",
    answer:
      "GeoWordle runs in most modern web browsers. There are no specific system requirements beyond having a device with internet access and a web browser."
  }
];
