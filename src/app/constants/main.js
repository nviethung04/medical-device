// Seting for using env file

export const MAIN_URL_APP = process.env.APP_URL;
export const SITE_NAME = process.env.SITE_NAME;
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
export const BASE_URL_API = process.env.APP_API_URL;
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
export const MONGODB_CONNECT = process.env.MONGODB_CONNECT;
export const CRYPTO_KEY = process.env.CRYPTO_KEY;
export const CRYPTO_IV = process.env.CRYPTO_IV;

export const MARKETING_LINK = ["/", "/contact", "/privacy-policy"];

export const LINK_DATA = [
  {
    url: "/",
    name: "🏠 Home"
  },
  {
    url: "/countryle",
    name: "🌇 Countryle"
  },
  {
    url: "/countryle-unlimited",
    name: "🌇 Countryle Unlimited "
  },
  {
    url: "/worldle",
    name: "🗺️ Worldle"
  },
  {
    url: "/worldle-unlimited",
    name: "🗺️ Worldle Unlimited "
  },
  {
    url: "/globle",
    name: "🌎 Globe"
  },
  {
    url: "/globle-unlimited",
    name: "🌎 Globe Unlimited "
  },
  {
    url: "/geodle",
    name: "📸 Geodle"
  },
  {
    url: "/geodle-unlimited",
    name: "📸 Geodle Unlimited"
  },
  {
    url: "/flaggle",
    name: "🏁 Flaggle"
  },
  {
    url: "/flaggle-unlimited",
    name: "🏁 Flaggle Unlimited "
  },
  {
    url: "/privacy-policy",
    name: "📋 Privacy Policy"
  },
  {
    url: "/contact",
    name: "📞 Contact"
  }
];

export const GAME_RECOMMEND = [
  {
    url: "/countryle",
    image: "/images/games/countryle-game-background.png",
    title: "Countryle",
    description:
      "Guess the country's name. After each guess, compare statistics with the answer to help you find the mysterious country."
  },

  {
    url: "/worldle",
    image: "/images/games/worldle-game-background2.png",
    title: "Worldle",
    description:
      "Guess the country based on its map silhouette in Worldle game. You'll receive helpful clues such as distance, direction."
  },

  {
    url: "/globle",
    image: "/images/games/globle-game-background.png",
    title: "Globle",
    description:
      "Find the country on the global map. Hotter colors on the globe indicate proximity to the hidden country."
  },
  {
    url: "/geodle",
    image: "/images/games/geodle-game-background.png",
    title: "Geodle",
    description:
      "Guess the country based on its flag. After each guess, you will receive a clue to find the mystery flag."
  },
  {
    url: "/flaggle",
    image: "/images/games/flaggle-game-background.png",
    title: "Flaggle",
    description:
      "Guess the flag of a country or territory. After each guess, you will receive a clue to find the mystery flag."
  }
  // {
  //   url: '/countryle',
  //   image: '/images/games/statele-game-background.png',
  //   title: 'Statele',
  //   description:
  //     'Guess the U.S. state, territory, or D.C. After each guess, you will receive different statistics comparing your guess to the target location.'
  // },
  // {
  //   url: '/countryle',
  //   image: '/images/games/travle-game-background.png',
  //   title: 'Travle',
  //   description:
  //     'Name countries to travel from the Start Country to the End Country. Countries are connected across borders, and there are many ways to do that.'
  // },
  // {
  //   url: '/countryle',
  //   image: '/images/games/worldle-game-background.png',
  //   title: 'Worldle',
  //   description:
  //     "Use the hints and information the questions provide to guess the mystery country. After each incorrect guess, you'll receive more clues."
  // }
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
    question: "How can I install GeoWorldle on my phone?",
    answer:
      'There is no application (yet) for GeoWorldle on the App Store or Google Play, but our web pages were optimized for mobile users. If you want to install the web page on your phone, you can find an option on your browser called "Add to home screen" or something similar!'
  },
  {
    question: "Are there any system requirements?",
    answer:
      "GeoWordle runs in most modern web browsers. There are no specific system requirements beyond having a device with internet access and a web browser."
  }
];
