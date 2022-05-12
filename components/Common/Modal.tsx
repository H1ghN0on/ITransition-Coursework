import React from "react";
import { Mask } from "@components/Common";
import { XCircle } from "react-bootstrap-icons";
import clsx from "clsx";

interface ModalProps {
  className: string;
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ className, children, closeModal }) => {
  return (
    <>
      <Mask />
      <div className="fixed top-0 left-0 z-1000 flex justify-center items-center w-screen h-screen overflow-y-visible">
        <div
          className={clsx(
            "bg-[#f7f7f8]  rounded shadow-inner relative",
            className
          )}
        >
          <XCircle
            onClick={closeModal}
            className="absolute top-2 right-2 z-1000 text-2xl text-black cursor-pointer"
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
