import React, { useEffect } from "react";
import { Header, Timeline, Sidebar } from "../components/index";
import Modal from "../components/Modal";
import { useStore } from "../context/ModalContext";
const DashBorad = () => {
  const { toggleModal } = useStore();
  useEffect(() => {
    document.body.classList = "bg-gray-50";
  });
  return (
    <div className="h-screen">
      {/* <Header /> */}
      <div className="sm:w-3/4 w-full mx-auto grid grid-cols-3">
        <Timeline />
        <Sidebar />
      </div>
      {toggleModal ? <Modal /> : null}
    </div>
  );
};

export default DashBorad;
