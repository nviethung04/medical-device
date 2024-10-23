"use client";

import { Flex, HStack, Heading, Image, useColorMode, Icon, useColorModeValue, Text, Box } from "@chakra-ui/react";

import { ModalContext } from "@yeardle/configs/modalContext";
import { MARKETING_LINK, APP_NAME } from "@yeardle/constants/AppConfig";
import { HowToPlayIcon, SettingsIconSvg, StatisticsIcon } from "@yeardle/constants/AppIconSvg";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";

const Header = ({ onOpen, ...rest }) => {
  const pathname = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();

  const { onShowModal, modalGame, onHideModal } = useContext(ModalContext);

  const buttonGameHidden = useMemo(() => {
    // check path is in MARKETING_LINK
    if (MARKETING_LINK.includes(pathname)) {
      return true;
    } else {
      return false;
    }
  }, [pathname]);

  const onChangeTheme = (e) => {
    toggleColorMode();
  };

  useEffect(() => {
    // get setting game from local storage
    const settingGame = localStorage.getItem("settingGame") || "{}";
    if (buttonGameHidden) {
      return;
    }
    if (settingGame) {
      let settingGameObj = JSON.parse(settingGame);
      if (!settingGameObj[pathname] || !settingGameObj[pathname].played) {
        // show modal howToPlayCountryle
        setTimeout(() => {
          onShowModal(`${pathname}/howToPlay`);
          // save setting game
          settingGameObj[pathname] = { played: true };
          localStorage.setItem("settingGame", JSON.stringify(settingGameObj));
        }, 100);
      }
    }
  }, [buttonGameHidden, onShowModal, pathname]);

  const IsMarketingLink = MARKETING_LINK.includes(pathname);

  const handleOpenModal = (e, category) => {
    e.preventDefault();
    let dataPath = "/";
    if (pathname === "/") {
      dataPath = "/game";
    }
    if (modalGame?.show === true) {
      if (modalGame?.type === `${dataPath}/${category}`) {
        onHideModal();
        return;
      }
    }
    onShowModal(`${dataPath}/${category}`);
  };

  const checkButtonActive = (category, className = "header-active") => {
    let dataPath = "/";
    if (pathname === "/") {
      dataPath = "/game";
    }
    return `${dataPath}/${category}` === modalGame?.type ? className : "";
  };

  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      bg={useColorModeValue("white", "gray.900")}
      alignContent={"center"}
      zIndex={3}
      position={"relative"}
      shadow={{ base: "sm", md: "md" }}
    >
      <Flex
        w={"full"}
        alignItems="center"
        color={useColorModeValue("gray.800", "white")}
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        px={{ base: "4", md: "8" }}
        justifyContent={{ base: "space-between", md: "space-between" }}
        className="header-container"
        {...rest}
      >
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Icon
              display={{ base: "flex", md: "none" }}
              marginRight={6}
              onClick={onOpen}
              aria-label="open menu"
              boxSize={6}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Icon>
          </Flex>
          <Image
            height={{ base: "40px", md: "35px" }}
            margin="auto"
            borderRadius="lg"
            src="/images/LOGO/timedle-logo.png"
            alt="some good alt text"
            objectFit="contain"
          />
          <Heading as="h2" size="lg" fontWeight={500} display={{ base: "none", md: "block" }}>
            {APP_NAME}
          </Heading>
        </HStack>

        <HStack spacing={{ base: "3", md: "6" }}>
          {/* <Icon onClick={(e) => onChangeTheme(e)} boxSize={8} className="cursor-pointer icon-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              {colorMode === "dark" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              )}
            </svg>
          </Icon> */}

          {!IsMarketingLink ? (
            <>
              <Flex
                alignItems={"center"}
                className={`cursor-pointer ${checkButtonActive("statistics")}`}
                display={{ base: "none", md: "flex" }}
                onClick={(e) => handleOpenModal(e, "statistics")}
              >
                <Icon boxSize={7}>{StatisticsIcon}</Icon>
                <Text ps={1} fontWeight={500} fontSize={20}>
                  Statistics
                </Text>
              </Flex>

              <Flex
                alignItems={"center"}
                className={`cursor-pointer ${checkButtonActive("howtoplay")}`}
                display={{ base: "none", md: "flex" }}
                onClick={(e) => handleOpenModal(e, "howtoplay")}
              >
                <Icon boxSize={7}>{HowToPlayIcon}</Icon>
                <Text ps={1} fontWeight={500} fontSize={20}>
                  How to play
                </Text>
              </Flex>
            </>
          ) : null}

          <Flex
            alignItems={"center"}
            className={`cursor-pointer ${checkButtonActive("setting")}`}
            display={{ base: "none", md: "flex" }}
            onClick={(e) => handleOpenModal(e, "setting")}
          >
            <Icon boxSize={7}>{SettingsIconSvg}</Icon>
            <Text ps={1} fontWeight={500} fontSize={20}>
              Setting
            </Text>
          </Flex>

          {!IsMarketingLink ? (
            <>
              <Icon
                onClick={(e) => handleOpenModal(e, "statistics")}
                boxSize={8}
                className={`cursor-pointer icon-header ${checkButtonActive("statistics", "header-active-icon")}`}
                display={{ base: "block", md: "none" }}
              >
                {StatisticsIcon}
              </Icon>

              <Icon
                onClick={(e) => handleOpenModal(e, "howtoplay")}
                boxSize={8}
                className={`cursor-pointer icon-header ${checkButtonActive("howtoplay", "header-active-icon")}`}
                display={{ base: "block", md: "none" }}
              >
                {HowToPlayIcon}
              </Icon>
            </>
          ) : null}

          <Icon
            onClick={(e) => handleOpenModal(e, "setting")}
            boxSize={8}
            className={`cursor-pointer icon-header ${checkButtonActive("setting", "header-active-icon")}`}
            display={{ base: "block", md: "none" }}
          >
            {SettingsIconSvg}
          </Icon>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
