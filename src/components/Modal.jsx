import React, { useRef } from "react";
// import { ImCancelCircle } from "react-icons/im";
import { useStore } from "../context/ModalContext";
const Modal = () => {
  //   const [showModal, setShowModal] = React.useState(false);
  //   console.log(imgSrc);
  const { imageSrc, setToggleModal } = useStore();
  return (
    <>
      <div
        onClick={() => setToggleModal(false)}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* <div
            onClick={() => setToggleModal(false)}
            className="text-white w-full p-2 text-2xl flex justify-end cursor-pointer"
          >
            <ImCancelCircle />
          </div> */}
          <div>
            <img src={imageSrc} className="w-[35rem]" alt="" />
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
