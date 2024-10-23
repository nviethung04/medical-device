import { HOME_FAQS, APP_URL, APP_NAME } from "@yeardle/constants/AppConfig";
import META_DATA from "./metaData";
import RecommendGamesComponent from "@yeardle/components/RecommendGamesComponent";
import FaQsComponent from "@yeardle/components/FaQsComponent";
import { Box, Divider, Flex, Heading, Image, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import FunctionGameComponent from "./FunctionGame/FunctionGameComponent";

export const metadata = {
  title: `${APP_NAME} | ${META_DATA.TITLE}`,
  description: META_DATA.DESCRIPTION,
  applicationName: META_DATA.APPLICATION_NAME,
  keywords: META_DATA.KEYWORDS,
  robots: META_DATA.ROBOTS,
  openGraph: {
    title: META_DATA.TITLE,
    description: META_DATA.DESCRIPTION,
    images: META_DATA.IMAGE,
    type: "website",
    url: APP_URL + META_DATA.URL
  }
};
const HomePage = () => {
  return (
    <Box position="relative">
      
    </Box>
  );
};

export default HomePage;
