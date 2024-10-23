import { Flex, Icon, Image, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

const NavItem = ({ icon, url, children, logo, isNewTab, ...rest }) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      target={isNewTab ? "_blank" : ""}
    >
      <Flex
        align="center"
        p="2"
        mx="4"
        mt={1}
        whiteSpace={"nowrap"}
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("gray.200", "gray.700"),
          color: useColorModeValue("gray.900", "gray.200")
        }}
        {...rest}
      >
        {icon && (
          <Icon mr="4" fontSize="20">
            {icon}
          </Icon>
        )}

        {logo && <Image src="/images/LOGO/timedle-logo.png" alt={`Logo ${children}`} width={30} height={30} me={2} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
