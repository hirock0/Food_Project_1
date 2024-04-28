"use client";
import Style from "./favourite.module.css";
import Back_Forword from "@/components/backOrforword/backorforword";
import { Most_Favourite_api } from "@/api_data/Most_Favourite_api/favourite_api";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Most_favourite(params: any) {
  const router = useRouter();

  const foodName = params.params?.foods || "";
  const foodStringName = foodName[0];
  const SplitData = foodStringName.split("%20");
  const ReduceFoodName = SplitData.reduce(
    (accu: any, elm: any, idx: any) => accu + " " + elm
  );

  const [buyData, setBuyData] = useState({
    foodname: "",
    emailOrnumber: "",
    image: "",
    price: "",
    contact: "",
    address: "",
    date: "",
  });

  const AllFood = Most_Favourite_api;
  const [allFoodArray, setAllFoodArray] = useState<any>([]);
  const AllFoodData = async () => {
    try {
      const FilterArray = AllFood.filter(
        (item: any) => item.title == ReduceFoodName
      );
      setAllFoodArray(FilterArray);
      const loggedUserData = await axios.get("/pages/api/signup");
      const User = loggedUserData.data?.loggedData || "";
      setBuyData({ ...buyData, emailOrnumber: User.emailOrnumber });
      console.log();
    } catch (error: any) {
      console.log("most_favourite data is not found");
    }
  };

  const onBuyPopup = (elm: any) => {
    try {
      const DateData = new Date();
      const date = DateData.toLocaleDateString();
      setBuyData({
        ...buyData,
        foodname: elm[0],
        price: elm[1],
        image: elm[2],
        date: date,
      });

      const popupDiv = document.querySelector(".BuyDiv") as HTMLElement;
      popupDiv.style.transform = `translateY(${0}%)`;
    } catch (error: any) {
      console.log("something went wrong!");
    }
  };

  const onCancelBtn = () => {
    const popupDiv = document.querySelector(".BuyDiv") as HTMLElement;
    popupDiv.style.transform = `translateY(${-100}%)`;
    setBuyData({
      ...buyData,
      foodname: "",
      price: "",
      image: "",
      contact: "",
      address: "",
    });
  };

  const [emptyText, setEmptyText] = useState({ contact: "", address: "" });
  const onBuy = async (e: any) => {
    e.preventDefault();

    if (buyData.contact == "") {
      setEmptyText({ ...emptyText, contact: "Contact field empty!" });
    } else if (buyData.address == "") {
      setEmptyText({ ...emptyText, address: "Address field empty!" });
    } else if (buyData.emailOrnumber == undefined) {
      alert("You are not logged!");
      router.push("/user/login");
    } else {
      const buySendData = await axios.post("/pages/api/buy_food/buy", buyData);
      if (!buySendData.data.success) {
        alert("Something went wrong");
      } else {
        alert("Buy Successfull");
      }
    }
  };

  useEffect(() => {
    AllFoodData();
  }, []);
  return (
    <main id={Style.main} className="  text-white ">
      <Back_Forword />
      <div className=" text-center underline underline-offset-4 h-24 bg-emerald-600/70 ">
        <h1 className=" pt-8">{ReduceFoodName}</h1>
      </div>
      <div id={Style.FoodList} className=" overflow-y-scroll ">
        <div className=" flex flex-col gap-3 items-center mt-5 ">
          {allFoodArray.map((item: any) => (
            <div
              key={item.id}
              className=" relative w-80 h-96 max-sm:w-72 max-sm:h-80 overflow-hidden rounded-md"
            >
              <Image
                src={item.image}
                alt="img"
                height={500}
                width={500}
                className="hover:scale-110"
              />
              <div className=" absolute w-full bottom-0 backdrop:filter backdrop-blur-3xl h-2/5 opacity-80">
                <h1 className=" text-center mt-2">{item.title}</h1>
                <h1 className=" text-center">{item.price}</h1>
                <h1 className=" text-center text-xs">{item.description}</h1>
                <div className=" flex justify-center items-center">
                  <button
                    onClick={() =>
                      onBuyPopup([item.title, item.price, item.image])
                    }
                    className="border w-52 mt-2 rounded-md h-8 hover:bg-green-700 active:bg-green-900 max-sm:h-7 max-sm:w-44"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* buy_popupDiv-start */}
      <div
        id={Style.buyPoupDiv}
        className="BuyDiv h-screen -translate-y-full bg-black  fixed left-0 right-0 top-0 z-50"
      >
        <button
          id=""
          onClick={onCancelBtn}
          className=" border fixed top-2 left-2  rounded-md hover:bg-red-600 active:bg-red-800"
        >
          <Image
            src={"/all_svg/arrow-left-line.svg"}
            alt="back"
            height={20}
            width={20}
            className=" "
          />
        </button>
        {/* form_div_start */}
        <div
          id={Style.BuyPopUpDiv}
          className=" flex items-center justify-center h-full"
        >
          <form className=" sm:w-1/2  items-center backdrop:filter backdrop-blur-3xl rounded-md  p-5 flex flex-col gap-3">
            <div className="w-full">
              <h1 className=" pl-2">Food Name:</h1>
              <input
                value={buyData.foodname}
                onChange={(e) =>
                  setBuyData({ ...buyData, foodname: e.target.value })
                }
                className=" pl-2 h-8 rounded-md text-black w-full"
              />
            </div>
            <div className="w-full">
              <h1 className=" pl-2">Price:</h1>
              <input
                value={buyData.price}
                onChange={(e) =>
                  setBuyData({ ...buyData, price: e.target.value })
                }
                className=" pl-2 h-8 rounded-md text-black w-full"
              />
            </div>
            <div className="w-full">
              <h1 className=" pl-2">Contact No:</h1>
              <input
                value={buyData.contact}
                onChange={(e) =>
                  setBuyData({ ...buyData, contact: e.target.value })
                }
                placeholder="Food Name"
                type="text"
                name="email"
                className=" pl-2 h-8 rounded-md text-black w-full"
              />
              {buyData.contact.length !== 0 ? null : (
                <h1 className=" text-red-200 text-center text-xs">
                  {emptyText.contact}
                </h1>
              )}
            </div>
            <div className="w-full">
              <h1 className=" pl-2">Address:</h1>
              <input
                value={buyData.address}
                onChange={(e) =>
                  setBuyData({ ...buyData, address: e.target.value })
                }
                placeholder="Food Name"
                type="address"
                name="address"
                className=" pl-2 h-8 rounded-md text-black w-full"
              />
              {buyData.address.length !== 0 ? null : (
                <h1 className=" text-red-200 text-center text-xs">
                  {emptyText.address}
                </h1>
              )}
            </div>
            <div className=" flex items-center justify-center">
              <Image
                src={buyData.image}
                alt="img"
                width={100}
                height={100}
                className=" rounded-md"
              />
            </div>
            <div className=" flex items-center justify-center">
              <button
                className=" border w-52 rounded-md h-8 hover:bg-green-600 active:bg-green-700"
                onClick={onBuy}
              >
                Order Place
              </button>
            </div>
          </form>
        </div>
        {/* form_div_end*/}
      </div>
      {/* buy_cart-end */}
    </main>
  );
}
