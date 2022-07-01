import React from "react";
import { useStore } from "../../context/ModalContext";
const Image = ({ imgSrc }) => {
  const { setImageSrc, setToggleModal } = useStore();
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => {
        setImageSrc(imgSrc);
        setToggleModal(true);
      }}
    >
      <img className="w-full" src={imgSrc} alt="user Post" />
    </div>
  );
};

export default Image;
