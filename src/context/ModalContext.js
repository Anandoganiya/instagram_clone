import { useContext, createContext, useState } from "react";

const modalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <modalContext.Provider
      value={{ imageSrc, setImageSrc, toggleModal, setToggleModal }}
    >
      {children}
    </modalContext.Provider>
  );
};
export const useStore = () => useContext(modalContext);
export default ModalContextProvider;
