"use client";
import { useEffect, useState } from "react";
import Style from "./signup.module.css";
import Image from "next/image";
import Back_Forword from "@/components/backOrforword/backorforword";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();
  const [SignupData, setSignupData] = useState({
    name: "",
    emailOrnumber: "",
    password: "",
    retypePassword: "",
    image: "",
  });
  const onBase64 = (e: any) => {
    try {
      const reader: any = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setSignupData({ ...SignupData, image: reader.result });
      };
      reader.onerror = (error: any) => {
        console.log("Data not found" + error);
      };
    } catch (error: any) {
      console.log("Something went wrong");
    }
  };

  const [Change, setChange] = useState(false);

  const onChangingBoolean = () => {
    if (
      SignupData.name !== "" &&
      SignupData.emailOrnumber !== "" &&
      SignupData.password !== "" &&
      SignupData.retypePassword !== ""
    ) {
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

  const [fieldwarnText, setFieldwarnText] = useState({
    name: "",
    emailOrnumber: "",
    password: "",
    reTypepassword: "",
  });
  const onSignup = async (e: any) => {
    e.preventDefault();
    if (SignupData.name == "") {
      setFieldwarnText({ ...fieldwarnText, name: "Name empty!" });
    } else if (SignupData.emailOrnumber == "") {
      setFieldwarnText({
        ...fieldwarnText,
        emailOrnumber: "Email or Number empty!",
      });
    } else if (SignupData.password == "") {
      setFieldwarnText({ ...fieldwarnText, password: "Password empty!" });
    } else if (SignupData.retypePassword == "") {
      setFieldwarnText({
        ...fieldwarnText,
        reTypepassword: "Re_Type password empty!",
      });
    } else if (SignupData.password !== SignupData.retypePassword) {
      alert("Math is not matched");
    } else {
      const sendSignupData = await axios.post("/pages/api/signup", SignupData);
      if (sendSignupData.data.success) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    onChangingBoolean();
  }, [SignupData]);

  return (
    <main
      id={Style.main}
      className=" text-white h-screen flex items-center justify-center"
    >
      {/* back_or_forward_start */}
      <Back_Forword />
      {/* back_or_forward_end */}
      <div className=" rounded-md p-5  backdrop:filter backdrop-blur-3xl opacity-95 sm:w-96">
        <h1 className=" text-center pb-5 underline underline-offset-4">
          SignUp Please
        </h1>
        <form className=" flex flex-col gap-3">
          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Full Name:</h1>
            <div>
              <input
                value={SignupData.name}
                onChange={(e) =>
                  setSignupData({ ...SignupData, name: e.target.value })
                }
                placeholder="Name"
                type="text"
                name="name"
                className=" h-8  pl-2 text-black outline-none w-full"
              />
            </div>
            {SignupData.name == "" ? (
              <h1 className=" text-xs text-center text-red-600">
                {fieldwarnText.name}
              </h1>
            ) : null}
          </div>
          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Email or Number:</h1>
            <div>
              <input
                value={SignupData.emailOrnumber}
                onChange={(e) =>
                  setSignupData({
                    ...SignupData,
                    emailOrnumber: e.target.value,
                  })
                }
                placeholder="Email or Number"
                type="text"
                name="email"
                className=" h-8  pl-2 text-black outline-none w-full"
              />
            </div>
            {SignupData.emailOrnumber == "" ? (
              <h1 className=" text-xs text-center text-red-600">
                {fieldwarnText.emailOrnumber}
              </h1>
            ) : null}
          </div>

          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Password:</h1>
            <div className=" relative">
              <input
                value={SignupData.password}
                onChange={(e) =>
                  setSignupData({ ...SignupData, password: e.target.value })
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
              {SignupData.password == "" ? (
                <h1 className=" text-xs text-center text-red-600">
                  {fieldwarnText.password}
                </h1>
              ) : null}
            </div>
          </div>

          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Re_type Password:</h1>
            <div>
              <input
                value={SignupData.retypePassword}
                onChange={(e) =>
                  setSignupData({
                    ...SignupData,
                    retypePassword: e.target.value,
                  })
                }
                placeholder="re-type password"
                type={!eyeflag ? "password" : "text"}
                name="password"
                className=" h-8  pl-2 text-black outline-none w-full"
              />
            </div>
            {SignupData.retypePassword == "" ? (
              <h1 className=" text-xs text-center text-red-600">
                {fieldwarnText.reTypepassword}
              </h1>
            ) : null}
          </div>
          <div className=" overflow-hidden bg-emerald-500 rounded-md">
            <h1 className=" pl-2">Image:(optional)</h1>
            <div>
              <input
                onChange={onBase64}
                accept="image/**"
                type="file"
                name="image"
                className=""
                id="uploadImg"
              />
            </div>
            <label
              htmlFor="uploadImg"
              className=" bg-red-50 h-8  rounded-md  border text-center text-xs flex items-center justify-center"
            >
              <h1 className=" text-slate-400">আপনার ছবি সংযুক্ত করুন</h1>
            </label>
          </div>
          {SignupData.image !== "" ? (
            <div className=" flex items-center justify-center">
              <Image
                src={SignupData.image}
                alt="Image"
                height={100}
                width={100}
              />
            </div>
          ) : null}

          <div className=" flex items-center justify-center">
            <button
              onClick={onSignup}
              className=" w-52 h-8 rounded-md bg-red-700 hover:bg-red-800 active:bg-red-900"
            >
              {!Change ? "Fill the fields" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
