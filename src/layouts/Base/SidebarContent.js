import { Box, CloseButton, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import Image from "next/image";
import Link from "next/link";
import { LINK_DATA, APP_NAME } from "@yeardle/constants/AppConfig";
import { usePathname } from "next/navigation";

const SidebarContent = ({ onClose, ...rest }) => {
  const pathname = usePathname();

  return (
    <Box
      transition=".3s ease-in-out"
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="full"
      h="full"
      paddingTop={{ base: "2", md: "10" }}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" display={{ base: "flex", md: "none" }}>
        <Link href="/">
          <Flex alignItems={"center"}>
            <Image
              className="cursor-pointer"
              src="/images/LOGO/timedle-logo.png"
              alt={`Logo ${APP_NAME}`}
              width={46}
              height={46}
            />
            <Text fontSize="2xl" fontWeight="500" ml="4">
              {APP_NAME}
            </Text>
          </Flex>
        </Link>
        <CloseButton display="flex" onClick={onClose} />
      </Flex>
      {LINK_DATA.map((link, index) => (
        <NavItem
          key={index}
          url={link.url}
          onClick={onClose}
          className={pathname === link.url ? "active-item-slider-bar" : "item-slider-bar"}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
