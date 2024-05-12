import { Box, Image } from "grommet";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyledInput } from "./styles";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Button } from "../Wrapped";
import { IoClose } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";

interface SignInModalProps {
  onClose: any;
}

const SignInModalProps: React.FC<SignInModalProps> = ({ onClose }) => {
  const { theme } = useSelector((state: any) => {
    const { theme } = state.webAppReducer;
    return { theme };
  });

  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [reveal, setReveal] = useState(false);

  return (
    <div className="text-sm fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className=" relative flex flex-col gap-12 dark:text-darkText w-[370px] h-[540px] bg-white dark:bg-darkSecondary rounded-[12px] p-6">
        <div
          onClick={onClose}
          className="absolute right-[1rem] top-[1rem] cursor-pointer"
        >
          {" "}
          <IoClose className="w-4 h-4" />
        </div>

        <div className="mx-auto w-[12rem] pt-6">
          {/* <Box direction="row" align="center" gap="small" width="10rem"> */}
          {theme === "dark" ? (
            <Image fit="cover" src="../../assets/img/logoDark.png" />
          ) : (
            <Image fit="cover" src="../../assets/img/logo.png" />
          )}
          {/* </Box> */}
        </div>

        <div className="flex gap-2 flex-col text-white items-start w-full gap-4">
          <div className="text-[22px]">Sign in</div>
          <div className="w-full flex flex-col items-start">
            <label htmlFor="email">Email or Username</label>

            <div className="flex px-3 justify-between items-center border h-[67px] rounded-[10px] w-full border-grayLight dark:border-darkerText">
              <input
                placeholder="Username"
                className="focus:outline-none bg-transparent bg-none w-full"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <label htmlFor="email">Password</label>

            <div className="flex px-3 justify-between items-center border h-[67px] rounded-[10px] w-full border-grayLight dark:border-darkerText">
              <input
                placeholder="Password"
                className="focus:outline-none bg-transparent bg-none w-5/6"
              />

              <div
                className="cursor-pointer"
                onClick={() => setReveal(!reveal)}
              >
                {reveal ? (
                  <IoEyeSharp className="w-6 h-6" />
                ) : (
                  <BsFillEyeSlashFill className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div>Remember me</div>
            <div className="cursor-pointer">Forgot Password ?</div>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-center justify-center">
          <Button inactive onClick={() => {}} label="Sign In" />
          <div>
            Don't have an account? <strong>Sign up</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInModalProps;
