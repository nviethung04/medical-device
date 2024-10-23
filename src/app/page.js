import { APP_URL, APP_NAME } from "@yeardle/constants/AppConfig";
import META_DATA from "./metaData";
import { Box, Heading, Text } from "@chakra-ui/react";

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
      <Box>
        <Heading as="h1" size="2xl" textAlign="center">
          Sắp ra mắt
        </Heading>
        <Text textAlign="center" fontSize="xl">
          Dự án quản lý thiết bị y tế
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
