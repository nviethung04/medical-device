const { Box, Flex, Heading, Icon } = require("@chakra-ui/react");
const { IconClose } = require("@yeardle/app/FunctionGame/constants/GameIcon");

const BaseModal = ({ children, ...props }) => {
  return (
    <Box w="100%" maxW={"650px"} minH={"650px"}>
      <Flex
        w="100%"
        maxW={"650px"}
        className="modal-header"
        align={"center"}
        justify={"space-between"}
        padding={2}
        px={{ base: 2, md: 3 }}
        borderRadius={8}
      >
        <span style={{ width: "24px" }}></span>
        <Heading as={"h3"} size={"md"}>
          Statistics
        </Heading>

        {/* close */}
        <Icon boxSize={6} onClick={props.onHideModal} className="cursor-pointer">
          {IconClose}
        </Icon>
      </Flex>

      <Box w="100%" p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseModal;
