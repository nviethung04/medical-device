"use client";

import { createContext, useState } from "react";

export const ModalContext = createContext();

const BaseContextLayout = ({ children }) => {
  const [modalGame, setModalGame] = useState({
    show: false,
    type: null
  });

  const onShowModal = (type) => {
    setModalGame({
      show: true,
      type
    });
  };

  const onHideModal = () => {
    setModalGame({
      show: false,
      type: null
    });
  };

  const valueProvider = {
    modalGame,
    onHideModal,
    onShowModal
  };
  return <ModalContext.Provider value={valueProvider}>{children}</ModalContext.Provider>;
};

export default BaseContextLayout;
