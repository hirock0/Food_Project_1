"use client";
import { HomeApi } from "@/api_data/home_page_api/home_api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Back_Forword from "@/components/backOrforword/backorforword";
import Style from "./buy.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Buy_Now(props: any) {
  const router = useRouter()
  const ReqId = props.searchParams.id;
  const splitUrl = ReqId.split("?");
  const rowId = splitUrl[0];
  const foodId = splitUrl[1];
  const foodName = props.params.buy_now;
  const splitFoodName = foodName.split("%20");
  const reduceFoodName = splitFoodName.reduce(
    (acc: any, item: any, index: any) => acc + " " + item
  );
  const allFoods = HomeApi;
  const [orderFood, setOrderFood] = useState({
    description: "",
    image: "",
    price: "",
    title: "",
    aboutFood: "",
    Category: "",
    seller: "",
  });
  const Order_Food = async () => {
    const filterFood = allFoods.filter((item: any) => item.id == rowId);
    const actualRow = filterFood[0];
    const foodArray = [];
    foodArray.push(
      actualRow.food1,
      actualRow.food2,
      actualRow.food3,
      actualRow.food4
    );
    const filteredactualFood: any = foodArray.filter(
      (item: any) => item.id == foodId && item.title == reduceFoodName
    );
    setOrderFood({
      ...orderFood,
      description: filteredactualFood[0].description,
      image: filteredactualFood[0].image,
      price: filteredactualFood[0].price,
      title: filteredactualFood[0].title,
      aboutFood: filteredactualFood[0].aboutFood,
      Category: filteredactualFood[0].Category,
      seller: filteredactualFood[0].seller,
    });
  };

  const [buyFlag, setBuyFlag] = useState(false);
  const onBuyPopup = () => {
    const BuyPopUp = document.querySelector(".placeOrderPopup") as HTMLElement;
    if (!buyFlag) {
      BuyPopUp.style.visibility = "visible";
      setBuyFlag((prev) => !prev);
    } else {
      BuyPopUp.style.visibility = "hidden";
      setBuyFlag((prev) => !prev);
    }
  };

  // popup_order_place_start
  const [orderData, setOrderData] = useState({
    image: "",
    price: "",
    foodname: "",
    Category: "",
    seller: "",
    contact: "",
    address: "",
    date: "",
  });
  const [emptyText, setEmptyText] = useState({ contact: "", address: "" });
  const [UserEmailorNumber, setUserEmailorNumbers] = useState("");
  const onOrderPlaceToDB = async (e: any) => {
    e.preventDefault();
    const userData = await axios.get(`/pages/api/signup`);
    const userEmailorNumber = userData.data.loggedData?.emailOrnumber || null;
    setUserEmailorNumbers(userEmailorNumber);
    const recentData = new Date();
    const date = recentData.toLocaleDateString();
    const allBuyData = {
      image:orderFood.image,
      price:orderFood.price,
      foodname:orderFood.title,
      contact:orderData.contact,
      address:orderData.address,
      emailOrnumber:userEmailorNumber,
      date:date,
    };

    if(userEmailorNumber == null){
        alert("Please login")
        router.push("/user/login")
    }
    else if  (allBuyData.contact == "") {
      setEmptyText({ ...emptyText, contact: "Contact No. Please !" });
    } else if (allBuyData.address == "") {
      setEmptyText({ ...emptyText, address: "Address Please !" });
    } else {
      const sendBuyData = await axios.post("/pages/api/buy_food/buy",allBuyData);
      if(sendBuyData.data.success){
          alert("Ordered Successfull!")
          router.refresh()
      }else{
        console.log("something went wrong")
      }
    }
  };

  const onBackPopup = () => {
    const BuyPopUp = document.querySelector(".placeOrderPopup") as HTMLElement;
    BuyPopUp.style.visibility = "hidden";
    setBuyFlag(false);
    setOrderData({ ...orderData, contact: "", address: "" });
  };
  useEffect(() => {
    Order_Food();
  }, [orderData,UserEmailorNumber]);
  return (
    <main
      id={Style.main}
      className=" h-screen w-full overflow-y-scroll text-white  pt-10"
    >
      <div className=" ">
        <Back_Forword />
      </div>
      
      <div className=" flex max-sm:flex-col sm:p-10 backdrop:filter backdrop-blur-3xl opacity-80 ">
        <div>
          <h1 className=" text-center underline underline-offset-4">
            {orderFood.title}
          </h1>
          <div className=" mt-2 flex flex-col items-center justify-center ">
            <div className=" w-52 h-72 rounded-md overflow-hidden  pt-2">
              <Image
                src={orderFood.image}
                alt="image"
                width={500}
                height={500}
                className="rounded hover:scale-110"
              />
            </div>
            {/* Category_section_start */}
            <div className=" mt-2">
              <div className=" text-xs flex gap-2 ">
                <h1>Category :</h1>
                <h1>{orderFood.Category}</h1>
              </div>
              <div className=" text-xs flex gap-2 ">
                <h1>Seller :</h1>
                <h1>{orderFood.seller}</h1>
              </div>
            </div>
            {/* Category_section_end */}

            <div className=" flex gap-2 mt-2">
              <h1>TK</h1>
              <h1>{orderFood.price}</h1>
            </div>
            <button
              onClick={onBuyPopup}
              className=" border w-40 h-8 rounded-md"
            >
              Buy
            </button>
          </div>
        </div>

        <div className=" mt-10 max-sm:mt-3 md:w-5/6 sm:pl-5 sm:pr-5 max-sm:w-full max-sm:pr-5 max-sm:pl-5">
          <p>{orderFood.aboutFood}</p>
        </div>
      </div>

      {/* form_div_start */}
      <div
        id={Style.BuyPopUpDiv}
        className=" invisible z-50 overflow-y-scroll fixed top-0  h-full w-full p-5 flex items-center justify-center placeOrderPopup"
      >
      <div className="h-screen max-sm:w-full sm:w-1/2 ">
        <div className=" fixed z-50 top-5 left-5 max-sm:top-0 max-sm:left-0">
          <button
            onClick={onBackPopup}
            className=" border rounded-md hover:bg-green-600 active:bg-green-800"
          >
            <Image
              src={"/all_svg/arrow-left-line.svg"}
              alt="back"
              width={25}
              height={25}
            />
          </button>
        </div>
        <form className=" max-sm:text-sm mt-10 items-center backdrop:filter backdrop-blur-3xl rounded-md  p-5 flex flex-col gap-3">
          <div className="w-full">
            <h1 className=" pl-2">Food Name:</h1>
            <input
              value={orderFood.title}
              onChange={(e) =>
                setOrderData({ ...orderData, foodname: e.target.value })
              }
              className=" pl-2 h-8 rounded-md text-black w-full"
            />
          </div>
          <div className="w-full">
            <h1 className=" pl-2">Price:</h1>
            <input
              value={orderFood.price}
              onChange={(e) =>
                setOrderData({ ...orderData, price: e.target.value })
              }
              className=" pl-2 h-8 rounded-md text-black w-full"
            />
          </div>
          <div className="w-full">
            <h1 className=" pl-2">Contact No:</h1>
            <input
              value={orderData.contact}
              onChange={(e) =>
                setOrderData({ ...orderData, contact: e.target.value })
              }
              placeholder="Food Name"
              type="text"
              name="email"
              className=" pl-2 h-8 rounded-md text-black w-full"
            />
            {orderData.contact !== "" ? null : (
              <h1 className=" text-red-500 text-center text-xs">
                {emptyText.contact}
              </h1>
            )}
          </div>
          <div className="w-full">
            <h1 className=" pl-2">Address:</h1>
            <input
              value={orderData.address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
              placeholder="Food Name"
              type="address"
              name="address"
              className=" pl-2 h-8 rounded-md text-black w-full"
            />
            {orderData.address !== "" ? null : (
              <h1 className=" text-red-500 text-center text-xs">
                {emptyText.address}
              </h1>
            )}
          </div>
          <div className=" flex items-center justify-center">
            <Image
              src={orderFood.image}
              alt="img"
              width={100}
              height={100}
              className=" rounded-md"
            />
          </div>
          <div className=" flex items-center justify-center">
            <button
              onClick={onOrderPlaceToDB}
              className=" border w-52 rounded-md h-8 hover:bg-green-600 active:bg-green-700"
            >
              Order Place
            </button>
          </div>
        </form>
      </div>
      </div>
      {/* form_div_end*/}
    </main>
  );
}
