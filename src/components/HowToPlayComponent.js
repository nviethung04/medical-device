import { Box, Heading } from "@chakra-ui/react";

const HowToPlayComponent = ({ children, title = "How to play?" }) => {
  return (
    <Box mt={3} borderTop="1px" borderColor="gray.200" pt={3}>
      <Box className="how-to-play">
        <Box bg="gray.100" borderRadius="md" px={2} mb={2}>
          <Heading as="h2" size="lg">
            {title}
          </Heading>
        </Box>
        <Box className="how-to-play-content">{children}</Box>
      </Box>
    </Box>
  );
};

export default HowToPlayComponent;
