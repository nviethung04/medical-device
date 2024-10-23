"use client";

import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { ModalContext } from "@yeardle/configs/modalContext";
import React, { useContext, useEffect, useState } from "react";

export default function BaseModalView(props) {
  const { Title = "Modal Title", typeList = [], children = <></> } = props;

  const { modalGame, onHideModal } = useContext(ModalContext);

  useEffect(() => {
    if (modalGame.show) {
      let gameType = modalGame.type;
      gameType = gameType.split("/");
      gameType = gameType[gameType.length - 1];
      if (typeList.includes(gameType)) {
        setShowModal(true);
      }
    } else {
      setShowModal(false);
    }
  }, [modalGame, typeList]);

  const onCloseModal = () => {
    setShowModal(false);
    onHideModal();
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal
        isOpen={showModal}
        onClose={() => onCloseModal()}
        scrollBehavior={"inside"}
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <ModalHeader>{Title}</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => onCloseModal()}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
