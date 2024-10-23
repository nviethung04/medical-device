// import Link from 'next/link';
import { useContext } from "react";
import { Box, Flex, Select, Switch, UnorderedList, ListItem, Text, useColorMode } from "@chakra-ui/react";
import { ModalContext } from "@yeardle/configs/modalContext";
import Link from "next/link";

const SettingModal = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onHideModal } = useContext(ModalContext);

  const closeSetting = () => {
    onHideModal("setting");
  };

  const onChangeMode = () => {
    toggleColorMode();
  };

  return (
    <Box className="modal-body" h="100%" w="100%">
      <UnorderedList listStyleType="none" pl={0} pb={2} ml={0}>
        <ListItem display="flex" justifyContent="space-between" p={2} borderBottom="1px" borderColor="gray.200">
          <Text as={"b"}>Language</Text>
          <Select size="sm" value="1" onChange={() => {}} width={150}>
            <option value="1">English</option>
          </Select>
        </ListItem>

        <ListItem display="flex" justifyContent="space-between" p={2} borderBottom="1px" borderColor="gray.200">
          <Text as={"b"}>Dark Mode</Text>
          <Switch id="darkModeSwitch" isChecked={colorMode === "dark"} onChange={onChangeMode} size="lg" />
        </ListItem>
      </UnorderedList>
      <Flex direction="column" align="center">
        <Link href="/privacy-policy" textDecoration="none" mb={1} onClick={closeSetting}>
          Privacy Policy
        </Link>
        <Link href="/contact" textDecoration="none" onClick={closeSetting}>
          Contact Us
        </Link>
      </Flex>
    </Box>
  );
};

export default SettingModal;
