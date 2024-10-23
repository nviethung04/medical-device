import { GAME_RECOMMEND } from "@yeardle/constants/AppConfig";
import Link from "next/link";
import { Box, Button, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";

const RecommendGamesComponent = (props) => {
  const { gameList = GAME_RECOMMEND, title = "Recommend Games" } = props;

  return (
    <Box mt={3} borderTop="1px" borderColor="gray.200" pt={3} className="w-100">
      {title && (
        <Box textAlign="center" mb={5}>
          <Heading as="h2" size="lg">
            {title}
          </Heading>
        </Box>
      )}

      <Grid
        templateColumns={{
          base: "repeat(auto-fill, minmax(200px, 2fr))",
          md: "repeat(auto-fill, minmax(300px, 1fr))"
        }}
        gap={3}
      >
        {gameList.map((game, index) => (
          <GridItem key={index}>
            <Link href={game.url}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                _hover={{ boxShadow: "lg" }}
                backgroundColor={game.bgColor || "white"}
              >
                <Image
                  src={game.image}
                  alt={game.description || game.title}
                  height={150}
                  className="w-100"
                  objectFit="cover"
                />
                <Box p={5}>
                  <Heading as="h4" size="sm" mb={2}>
                    {game.title}
                  </Heading>
                  {game.description && (
                    <Text fontSize="sm" mb={3}>
                      {game.description}
                    </Text>
                  )}
                  <Button colorScheme="yellow">Play</Button>
                </Box>
              </Box>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendGamesComponent;
