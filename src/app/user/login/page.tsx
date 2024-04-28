"use client";

import Link from "next/link";
import Style from "./login.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Back_Forword from "@/components/backOrforword/backorforword";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [LoginData, setLoginData] = useState({
    emailOrnumber: "",
    password: "",
  });

  const [Change, setChange] = useState(false);
  const onChangingBoolean = () => {
    if (LoginData.emailOrnumber !== "" && LoginData.password !== "") {
      setChange(true);
    }
  };

  const [eyeflag, setEyeFlag] = useState(false);
  const paswordEye = () => {
    const eyeOpenBtn = document.querySelector("#eyeOpen") as HTMLElement;
    const eyeCloseBtn = document.querySelector("#eyeClose") as HTMLElement;
    if (!eyeflag) {
      eyeOpenBtn.style.visibility = "visible";
      setEyeFlag((prev) => !prev);
      eyeCloseBtn.style.visibility = "hidden";
    } else {
      eyeOpenBtn.style.visibility = "hidden";
      setEyeFlag((prev) => !prev);
      eyeCloseBtn.style.visibility = "visible";
    }
  };

  const [loginverifyData, setLoginverifyData] = useState({
    message1: "",
    message2: "",
  });
  const [requiredField, setRequiredField] = useState("");
  const onLogin = async (e: any) => {
    e.preventDefault();
    if (LoginData.emailOrnumber == "" || LoginData.password == "") {
      setRequiredField("pleae fill up!");
    } else {
      const sendLogindata = await axios.post("/pages/api/login", LoginData);
      const verifyData = sendLogindata.data;
      if (!verifyData.success) {
        setLoginverifyData({
          ...loginverifyData,
          message1: verifyData.message1,
          message2: verifyData.message2,
        });
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    onChangingBoolean();
  }, [LoginData]);

  return (
    <main
      id={Style.main}
      className=" text-white h-screen flex items-center justify-center"
    >
      {/* back_or_forward_start */}
      <Back_Forword />
      {/* back_or_forward_end */}

      <div className=" flex flex-col gap-4 rounded-md p-5  backdrop:filter backdrop-blur-3xl opacity-95 sm:w-96">
        <h1 className=" text-center pb-2 underline underline-offset-4">
          SignUp Please
        </h1>
        <form className=" flex flex-col gap-3">
          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Email or Number:</h1>
            <div>
              <input
                value={LoginData.emailOrnumber}
                onChange={(e) =>
                  setLoginData({ ...LoginData, emailOrnumber: e.target.value })
                }
                placeholder="Email or Number"
                type="text"
                name="email"
                className=" h-8  pl-2 text-black outline-none w-full"
              />
            </div>
            {LoginData.emailOrnumber !== "" ? (
              <h1 className=" text-red-600 text-center text-xs">
                {loginverifyData.message1}
              </h1>
            ) : LoginData.emailOrnumber !== "" ? null : (
              <h1 className="text-xs text-center text-black">
                {requiredField}
              </h1>
            )}
          </div>

          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Password:</h1>
            <div className=" relative">
              <input
                value={LoginData.password}
                onChange={(e) =>
                  setLoginData({ ...LoginData, password: e.target.value })
                }
                placeholder="password"
                type={!eyeflag ? "password" : "text"}
                name="password"
                className=" h-8  pl-2 text-black outline-none w-full"
              />
              <div className=" cursor-pointer" onClick={paswordEye}>
                <Image
                  id="eyeOpen"
                  src={"/all_svg/eye-fill.svg"}
                  alt="eye"
                  width={20}
                  height={20}
                  className=" invisible absolute z-10 top-2 right-2  "
                />
                <Image
                  id="eyeClose"
                  src={"/all_svg/eye-off-fill.svg"}
                  alt="eye-off"
                  width={20}
                  height={20}
                  className=" absolute z-10 top-2 right-2 "
                />
              </div>
            </div>
            {LoginData.password !== "" ? (
              <h1 className=" text-red-600 text-center text-xs">
                {loginverifyData.message2}
              </h1>
            ) : LoginData.password !== "" ? null : (
              <h1 className=" text-xs text-center text-black">
                {requiredField}
              </h1>
            )}
          </div>

          <div className=" flex items-center justify-center">
            <button
              onClick={onLogin}
              className=" w-52 h-8 rounded-md bg-red-700 hover:bg-red-800 active:bg-red-900"
            >
              {!Change ? "Fill the fields" : "Login"}
            </button>
          </div>
        </form>
        <div className=" flex items-center justify-center">
          <Link href={"/user/signup"}>
            <button className=" w-52 h-8 rounded-md bg-emerald-600 hover:bg-emerald-800 active:bg-emerald-900">
              Create new account
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
