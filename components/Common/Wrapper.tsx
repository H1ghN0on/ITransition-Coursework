import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { clearUser } from "@redux/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { ToastContainer } from "react-toastify";
import Button from "./Button";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);

  const handleButtonClick = () => {
    dispatch(clearUser());
    Cookies.remove("token");
    router.push("/auth/login");
  };

  if (user.status === "block") {
    return (
      <div className="flex flex-col justify-center w-[100vw] h-[100vh] items-center bg-red-600">
        <span className="text-5xl text-white mb-3">You have been blocked</span>
        <Button color="white" background="black" onClick={handleButtonClick}>
          Log out
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center min-h-[100vh] w-[100vw] h-[100%] pt-[2vh] md:pt-[10vh] dark:bg-[#1F1D36]">
        {children}
        <ToastContainer
          position="bottom-left"
          hideProgressBar={true}
          autoClose={5000}
        />
      </div>
    );
  }
};

export default Wrapper;
