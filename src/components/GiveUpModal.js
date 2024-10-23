import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider
} from "@chakra-ui/react";

const GiveUpModal = (props) => {
  const { handleQuitGame, setOpenGiveUpModal, openGiveUpModal } = props;

  return (
    <>
      <Modal
        isOpen={openGiveUpModal}
        onClose={() => setOpenGiveUpModal(false)}
        isCentered
        size={{ base: "sm", md: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to give up?</ModalHeader>
          <Divider />
          <ModalBody>
            When you give up, this game won't affect your stats. You can see the hidden country afterward.
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button variant="ghost" onClick={() => setOpenGiveUpModal(false)} mr={3}>
              Close
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleQuitGame();
                setOpenGiveUpModal(false);
              }}
            >
              Give up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GiveUpModal;
