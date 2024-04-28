"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Back_Forword from "@/components/backOrforword/backorforword";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AllData } from "@/components/redux/slice/slice";
import Style from "./details.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

export default function Profile(props: any) {
  const userId = props.params?.details || "";
  const userDetails = useSelector((state: any) => state.slices?.data || "");
  const userData = userDetails[0]?.loggedData || "";
  const BuyData = userDetails[2]?.buydata || "";
  const router = useRouter();

  const [userBuydata, setUserbuy] = useState([]);
  const onBuyData = async () => {
    try {
      const allBuyDetails = await axios.get("/pages/api/buy_food/buy");
      const allbuyData = allBuyDetails.data.buydata;
      const loggedData = await axios.get("/pages/api/signup");
      const loggedUser = loggedData.data.loggedData?.emailOrnumber || "";
      const filterBuydata = allbuyData.filter(
        (item: any) => item.emailOrnumber == loggedUser
      );
      setUserbuy(filterBuydata);
    } catch (error: any) {
      console.log("Something went wrong");
    }
  };

  const onLogut = async () => {
    const Logout = await axios.get(`/pages/api/logout`);
    if (Logout.data.success) {
      router.push("/");
    } else {
      console.log("something went wrong");
    }
  };

  const onUpdate = () => {
    const updatePoupDiv = document.querySelector("#updatePopup") as HTMLElement;
    updatePoupDiv.style.visibility = "visible";
  };

  const [uploadImage, setUploadImage] = useState("");
  const onBase64 = (e: any) => {
    try {
      const reader: any = new FileReader();
      reader.readAsDataURL(e.target?.files[0] || null);
      reader.onload = () => {
        setUploadImage(reader.result);
      };
      reader.onerror = (error: any) => {
        console.log("something went wrong" + error);
      };
    } catch (error: any) {
      console.log("Something went wrong");
    }
  };
  const [imageblankText, setImageblankText] = useState("");
  const onUpdateImage = async () => {
    const updatedetails = {
      id: userId,
      image: uploadImage,
    };
    if (updatedetails.image == "") {
      setImageblankText("No image here!");
    } else {
      const sendData = await axios.post(
        "/pages/api/profile/imageupdate",
        updatedetails
      );
      if (!sendData.data.success) {
        console.log("Data is not updated");
      } else {
        const updatePoupDiv = document.querySelector(
          "#updatePopup"
        ) as HTMLElement;
        updatePoupDiv.style.visibility = "visible";
        router.refresh();
      }
    }
  };

  // window Events
  const onWindow = () => {
    const innerpopupDiv = document.querySelector(
      "#innerUpdatePopupDiv"
    ) as HTMLElement;
    const upLoadBtn = document.querySelector("#uploadBtn") as HTMLElement;
    const updatePoupDiv = document.querySelector("#updatePopup") as HTMLElement;
    document.addEventListener("click", (e: any) => {
      if (!innerpopupDiv.contains(e.target) && !upLoadBtn.contains(e.target)) {
        updatePoupDiv.style.visibility = "hidden";
        setUploadImage("");
      }
    });
  };
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(AllData());
    onWindow();
    onBuyData();
  }, []);

  return (
    <main
      id={Style.main}
      className=" h-screen text-white pb-10 pt-16 overflow-y-scroll"
    >
      <Back_Forword />
      <div className=" flex flex-col items-center justify-center">
        <div className=" relative">
          <Image
            src={userData.image}
            alt="profile"
            width={100}
            height={100}
            className=" rounded-full"
          />
          <button
            id="uploadBtn"
            onClick={onUpdate}
            className=" absolute bottom-4 right-2 text-xs bg-black rounded-md"
          >
            <Image
              src={"/all_svg/image-fill.svg"}
              alt="image"
              width={20}
              height={20}
              className=""
            />
          </button>
        </div>
        {/* profile_details_start */}
        <div className=" mt-5 border p-3 rounded-md bg-white text-black">
          <h1 className=" text-center">{userData.name}</h1>
          <h1 className=" text-center">{userData.emailOrnumber}</h1>
          <div
            id="buyDivData"
            className=" select-none cursor-pointer border bg-slate-400 rounded-md"
          >
            <h1 className=" text-center">Total Buy:</h1>
            <h1 className=" text-center">{userBuydata.length}</h1>
          </div>
        </div>
        {/* profile_details_end*/}
      </div>
      <div
        id={Style.buyDetails}
        className="  mt-5 p-5  flex items-center justify-center"
      >
        {userBuydata.length !== 0 ? (
          <div className=" h-72 w-96 max-sm:w-60 rounded-md overflow-hidden">
            <Swiper
              pagination={true}
              spaceBetween={10}
              modules={[Navigation, Pagination]}
            >
              {userBuydata.map((item: any) => (
                <SwiperSlide key={item._id}>
                  <div className="relative h-72 w-96  overflow-hidden">
                    <Image
                      src={item.image}
                      alt="image"
                      width={500}
                      height={500}
                      className=" transition-all "
                    />
                    <div className=" absolute w-full h-2/4 bottom-0 backdrop:filter backdrop-blur-3xl opacity-80 max-sm:pt-5">
                      <h1 className=" text-center max-sm:text-start max-sm:pl-10">
                        {item.foodname}
                      </h1>
                      <h1 className=" flex  justify-center gap-1 max-sm:justify-start max-sm:pl-10">
                        <span>Price:</span>
                        <span>{item.price}</span>
                      </h1>
                      <h1 className=" flex  justify-center gap-1 max-sm:justify-start max-sm:pl-10">
                        <span>Date:</span>
                        <span>{item.date}</span>
                      </h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="  p-5 rounded-md backdrop:filter backdrop-blur-3xl opacity-90">
            <h1 className=" text-center text-red-600">You did not buy yet!</h1>
          </div>
        )}
      </div>

      <div className=" flex items-center justify-center">
        <button
          onClick={onLogut}
          className=" border w-52 h-8 rounded-md hover:bg-red-700 active:bg-red-900"
        >
          Logout
        </button>
      </div>

      {/* update_image_popup_start */}

      <div
        id="updatePopup"
        className=" invisible h-screen fixed bg-slate-800/80 z-50 top-0 right-0 left-0 flex items-center justify-center "
      >
        <div
          id="innerUpdatePopupDiv"
          className=" rounded-md backdrop:filter backdrop-blur-3xl border p-5"
        >
          <h1 className=" text-center pb-5">Update your photo !</h1>
          <div className="">
            <h1>Image</h1>
            <input
              id="uploadImg"
              type="file"
              accept="image/**"
              onChange={onBase64}
              className=""
            />
            <label
              htmlFor="uploadImg"
              className=" bg-red-50 h-8  rounded-md  border text-center text-xs flex items-center justify-center"
            >
              <h1 className=" text-slate-400">আপনার ছবি সংযুক্ত করুন</h1>
            </label>
          </div>

          {uploadImage == "" ? (
            <h1 className=" text-red-500 text-center text-xs mt-2">
              {imageblankText}
            </h1>
          ) : (
            <div className=" mt-3 flex items-center justify-center">
              <Image
                src={uploadImage}
                alt="image"
                width={100}
                height={100}
                className=" rounded-sm"
              />
            </div>
          )}

          <div className=" mt-5 flex items-center justify-center">
            <button
              onClick={onUpdateImage}
              className=" border  w-52 rounded-md h-8 hover:bg-green-600 active:bg-green-800"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* update_Image_popup_end */}
    </main>
  );
}
