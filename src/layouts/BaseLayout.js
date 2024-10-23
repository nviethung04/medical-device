"use client";
import React from "react";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  DrawerOverlay,
  Grid,
  GridItem
} from "@chakra-ui/react";
import BaseContextLayout from "@yeardle/configs/modalContext";
import SidebarContent from "./Base/SidebarContent";
import Footer from "./Base/Footer";
import Header from "./Base/Header";
import BaseModalView from "./BaseModalView";
import SettingModal from "./Base/SettingModal";

export default function BaseLayout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <BaseContextLayout>
      <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")} className="position-relative">
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          display={{ base: "block", md: "none" }}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerOverlay />
          <DrawerContent maxW={"70%"} className="content">
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Header onOpen={onOpen} />
        <Grid
          templateColumns={{ base: "1fr", md: "250px auto", lg: "300px auto" }}
          display={{ base: "block", md: "grid" }}
        >
          <GridItem display={{ base: "none", md: "block" }}>
            <SidebarContent onClose={onClose} />
          </GridItem>

          <GridItem>
            <Box
              ml={{ base: 0, md: 0 }}
              mr={{ base: 0, md: 0 }}
              padding={{ base: 1, md: 5 }}
              px={{ base: 2, md: 20 }}
              pt={{ base: 2, md: 4 }}
              minH={"100vh"}
            >
              {children}
            </Box>
          </GridItem>
        </Grid>

        <BaseModalView Title="Setting" typeList={["setting"]}>
          <SettingModal />
        </BaseModalView>

        <Footer />
      </Box>
    </BaseContextLayout>
  );
}
