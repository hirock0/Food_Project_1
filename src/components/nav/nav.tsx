"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Search_Box from "../search_box/searchBox";
import Continantal from "./nav_components/continental/continental";
import Most_Favourite from "./nav_components/most_favourite/favourite";
import Link from "next/link";
import Style from "./nav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AllData } from "../redux/slice/slice";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Nav() {
  const router = useRouter();
  const [menuFlag, setMenuFlag] = useState(false);
  const onMenu = () => {
    const SideMenu = document.querySelector(".sideMenu") as HTMLElement;
    if (!menuFlag) {
      SideMenu.style.transform = `translateX(${0}%)`;
      setMenuFlag((prev) => !prev);
    } else {
      SideMenu.style.transform = `translateX(${-100}%)`;
      setMenuFlag((prev) => !prev);
    }
  };

  // continental+most_favourite_start
  const [continentalflag, setContinenalflag] = useState(false);
  const [favouriteFlag, setFavouriteFlag] = useState(false);
  const continental_function = () => {
    const conTinentaldiv = document.querySelector(
      ".continentalDiv"
    ) as HTMLElement;
    const favouritediv = document.querySelector(".favouriteDiv") as HTMLElement;

    if (!continentalflag) {
      conTinentaldiv.style.visibility = "visible";
      conTinentaldiv.style.opacity = "1";
      setContinenalflag((prev) => !prev);
      favouritediv.style.visibility = "hidden";
      setFavouriteFlag(false);
    } else {
      conTinentaldiv.style.visibility = "hidden";
      conTinentaldiv.style.opacity = "0";
      setContinenalflag((prev) => !prev);
    }
  };
  const favourite_function = () => {
    const conTinentaldiv = document.querySelector(
      ".continentalDiv"
    ) as HTMLElement;
    const favouritediv = document.querySelector(".favouriteDiv") as HTMLElement;
    if (!favouriteFlag) {
      favouritediv.style.visibility = "visible";
      favouritediv.style.opacity = "1";
      setFavouriteFlag((prev) => !prev);
      conTinentaldiv.style.visibility = "hidden";
      setContinenalflag(false);
    } else {
      favouritediv.style.visibility = "hidden";
      favouritediv.style.opacity = "0";
      setFavouriteFlag((prev) => !prev);
    }
  };
  // continental+most_favourite_end

  // onCart-btn

  const [cartFlag, setCartFlag] = useState(false);
  const oncartBtn = () => {
    const CartDiv = document.querySelector(".cartDiv") as HTMLElement;
    if (!cartFlag) {
      CartDiv.style.visibility = "visible";
      CartDiv.style.opacity = "1";
      setCartFlag((prev) => !prev);
    } else {
      CartDiv.style.visibility = "hidden";
      CartDiv.style.opacity = "0";
      setCartFlag((prev) => !prev);
    }
  };
  // delete_cart
  const [deleteId, setDeleteId] = useState("");
  const ondeleteCart = async (id: any) => {
    const deletePopup = document.querySelector("#deletepopup") as HTMLElement;
    deletePopup.style.visibility = "visible";
    setDeleteId(id);
  };
  const popupDeleteBtn = async () => {
    const deletedata = await axios.get(`/pages/api/cart/${deleteId}`);
    if (deletedata.data.success) {
      const deletePopup = document.querySelector("#deletepopup") as HTMLElement;
      deletePopup.style.visibility = "hidden";
      router.refresh();
    } else {
      console.log("something went wrong");
    }
  };
  const onCancelDelete = () => {
    const deletePopup = document.querySelector("#deletepopup") as HTMLElement;
    deletePopup.style.visibility = "hidden";
  };

  // delete_cart-end

  // onBuy_popup
  const [buyData, setBuyData] = useState({
    foodName: "",
    foodPrice: "",
    foodImage: "",
    emailOrnumber: "",
  });
  const onBuyPopup = async (e: any) => {
    const sendBuyId = await axios.get(`/pages/api/buy_food/buy/${e}`);
    const food = sendBuyId.data.findFood;
    setBuyData({
      ...buyData,
      foodName: food.foodName,
      foodPrice: food.price,
      foodImage: food.image,
      emailOrnumber: food.emailOrnumber,
    });
    const buypopup = document.querySelector("#buypopupDiv") as HTMLElement;
    buypopup.style.visibility = "visible";
  };
  const onBackBtn = () => {
    const buypopup = document.querySelector("#buypopupDiv") as HTMLElement;
    buypopup.style.visibility = "hidden";
  };

  const [emptyText, setEmptyText] = useState({
    contact: "please fill contact!",
    address: "please fill contact!",
  });
  const [orderData, setOrderData] = useState({
    image: "",
    price: "",
    foodname: "",
    contact: "",
    address: "",
    date: "",
  });

  const onPlaceOrder = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    const recentData = date.toLocaleDateString();
    const order = {
      image: buyData.foodImage,
      price: buyData.foodPrice,
      foodname: buyData.foodName,
      contact: orderData.contact,
      address: orderData.address,
      emailOrnumber: buyData.emailOrnumber,
      date: recentData,
    };
    if (order.address == "" || order.contact == "") {
      console.log("fill all fields");
    } else {
      const sendBuyData = await axios.post("/pages/api/buy_food/buy", order);
      if (sendBuyData.data.success) {
        alert("Ordered Successfull!");
        router.refresh();
      } else {
        console.log("something went wrong");
      }
    }
  };

  // window_start
  const onWindows = () => {
    const conTinentaldiv = document.querySelector(
      ".continentalDiv"
    ) as HTMLElement;
    const favouritediv = document.querySelector(".favouriteDiv") as HTMLElement;
    const SideMenu = document.querySelector(".sideMenu") as HTMLElement;
    const MenuLineBtn = document.querySelector("#menuLineBtn") as HTMLElement;
    const CartDiv = document.querySelector(".cartDiv") as HTMLElement;
    const cartBtn = document.querySelector("#cartBtn") as HTMLElement;
    document.addEventListener("click", (e: any) => {
      if (!SideMenu.contains(e.target) && !MenuLineBtn.contains(e.target)) {
        SideMenu.style.transform = `translateX(${-100}%)`;
        setMenuFlag(false);
      }

      if (
        !conTinentaldiv.contains(e.target) &&
        e.target.id !== "continantalBtn"
      ) {
        conTinentaldiv.style.visibility = "hidden";
        conTinentaldiv.style.opacity = "0";
        setContinenalflag(false);
      }
      if (!favouritediv.contains(e.target) && e.target.id !== "favouriteBtn") {
        favouritediv.style.visibility = "hidden";
        favouritediv.style.opacity = "0";
        setFavouriteFlag(false);
      }
      if (!CartDiv.contains(e.target) && !cartBtn.contains(e.target)) {
        CartDiv.style.visibility = "hidden";
        CartDiv.style.opacity = "0";
        setCartFlag(false);
      }
    });
  };
  const dispatch: any = useDispatch();
  const allDetails = useSelector((state: any) => state.slices?.data || "");
  const loggedUser = allDetails[0]?.loggedData || "";
  const loggedemailOrnumber = loggedUser.emailOrnumber;
  const [carts, setCarts] = useState([]);
  const onCartData = async () => {
    try {
      const cartsArray = await axios.get("/pages/api/cart");
      const cartsData = cartsArray.data?.allCartsDetails || "";
      const loggedData = await axios.get("/pages/api/signup");
      const loguserdemailOrnumber =
        loggedData.data.loggedData?.emailOrnumber || "";
      const filterCarts = cartsData.filter(
        (item: any) => item.emailOrnumber == loguserdemailOrnumber
      );
      setCarts(filterCarts);
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    onWindows();
    dispatch(AllData());
    onCartData();
  }, [carts]);
  return (
    <nav className=" flex flex-col backdrop:filter backdrop-blur-3xl pr-10 pl-10 max-sm:pr-5 max-sm:pl-5 fixed top-0 right-0 left-0 z-50 bg-slate-800/80 max-sm:pb-8 md:pb-0">
      <div className="  text-white h-20 flex items-center justify-between gap-5">
        <div id="menuLineBtn">
          <button
            onClick={onMenu}
            className="menuLine w-8 h-8 max-sm:w-5 max-sm:h-5 flex items-center justify-center "
          >
            <Image
              src={"/all_svg/menu-line.svg"}
              alt="hambergermenu"
              width={25}
              height={25}
            />
          </button>
        </div>
        <div className=" w-full max-sm:hidden sm:block">
          <Search_Box />
        </div>
        <div className=" max-sm:text-xs text-nowrap  max-sm:gap-2  sm:gap-5 md:gap-2  flex items-center">
          <div className=" max-sm:hidden sm:block">
            <ul className=" flex  gap-2 text-xs ">
              <li>
                <button
                  onClick={continental_function}
                  id="continantalBtn"
                  className=" hover:underline hover:underline-offset-2 cursor-pointer hover:text-yellow-500  active:text-yellow-700"
                >
                  Continental
                </button>
              </li>
              <li>
                <button
                  onClick={favourite_function}
                  id="favouriteBtn"
                  className=" hover:underline hover:underline-offset-2 cursor-pointer hover:text-yellow-500  active:text-yellow-700"
                >
                  Most favourites
                </button>
              </li>
            </ul>
          </div>

          <div className=" flex items-center gap-2">
            {loggedUser.image !== undefined ? (
              <Link href={`/user/profile/${loggedUser._id}`}>
                <button className="sm::mr-5 md:mr-0 cursor-pointer h-12 w-12 max-sm:w-10 max-sm:h-10 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={loggedUser.image}
                    alt="profile"
                    width={500}
                    height={500}
                    className=" "
                  />
                </button>
              </Link>
            ) : (
              <Link href={"/user/login"}>
                <button className=" hover:bg-green-800 active:bg-green-900 bg-green-700 text-xs  sm::mr-5 md:mr-0 cursor-pointer h-12 w-12 max-sm:w-10 max-sm:h-10 rounded-full flex items-center justify-center">
                  Login
                </button>
              </Link>
            )}

            {/* cart_section_start */}
            <div className="relative">
              <div
                id="cartBtn"
                onClick={oncartBtn}
                className=" cursor-pointer  h-10 w-10 bg-slate-900 hover:bg-slate-700 active:bg-slate-950 rounded-full flex items-center justify-center"
              >
                <Image
                  src={"/all_svg/shopping-cart-2-line.svg"}
                  alt="cart"
                  width={20}
                  height={20}
                />
                {/* cart_length_start */}
                <div className=" absolute right-0 text-xs  bg-yellow-300 text-red-800 rounded-full h-4 w-4 flex items-center justify-center">
                  {loggedemailOrnumber == undefined ? "0" : carts?.length}
                </div>
                {/* cart_length_end */}
              </div>
              <div
                id={Style.CartDiv}
                className=" bg-white rounded-md  pr-2 pl-2 pt-2 cartDiv w-52 h-96  invisible opacity-0  fixed top-20 max-sm:top-20 right-1 overflow-y-scroll"
              >
                {/* delete_popup_start */}
                <div
                  id="deletepopup"
                  className="text-xs invisible w-52 h-96  fixed top-24 max-sm:top-20 right-1 z-50 bg-slate-800/80 flex items-center justify-center"
                >
                  <div className=" border rounded-md p-5">
                    <h1 className=" text-center ">Do you want to delete?</h1>
                    <div className=" mt-5 w-36 flex justify-between">
                      <button
                        onClick={onCancelDelete}
                        className=" border w-16  h-7 rounded-md hover:bg-red-800 active:bg-red-900 "
                      >
                        cancel
                      </button>
                      <button
                        onClick={popupDeleteBtn}
                        className=" border w-16 h-7 rounded-md hover:bg-green-700 active:bg-green-900 "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                {/* delete_popup_end */}
                <div className="flex flex-col items-center gap-2 text-wrap cursor-pointer pb-10">
                  {carts.length == 0 ? (
                    <h1 className=" text-center mt-2 text-red-600 ">
                      Cart is not available here!
                    </h1>
                  ) : (
                    carts.map((item: any) => (
                      <div
                        key={item._id}
                        className=" relative h-40 w-40 overflow-hidden rounded-md"
                      >
                        <Image
                          src={item.image}
                          alt="cart"
                          width={500}
                          height={500}
                        />
                        <div className=" absolute bottom-0 rounded-b-md overflow-hidden  w-full h-16 backdrop:filter backdrop-blur-3xl opacity-90 text-xs">
                          <h1 className=" text-center pt-1">{item.foodName}</h1>
                          <h1 className=" text-center ">
                            <span>price:</span> <span>{item.price}</span>
                          </h1>
                          <div className=" flex gap-2 justify-center items-center mt-1">
                            <button
                              onClick={() => onBuyPopup(item._id)}
                              className=" border w-16 rounded-md hover:bg-emerald-700 active:bg-emerald-900 "
                            >
                              Buy
                            </button>
                            <button
                              onClick={() => ondeleteCart(item._id)}
                              className=" border w-16 rounded-md hover:bg-red-700 active:bg-red-900 "
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* cart_section_end */}
          </div>
        </div>
      </div>

      <div className=" w-full  flex flex-col items-center gap-4 sm:hidden">
        <div>
          <Search_Box />
        </div>
        <div className=" w-full">
          <ul className=" flex justify-around text-xs w-full ">
            <li>
              <button
                onClick={continental_function}
                id="continantalBtn"
                className="continantalBtn hover:underline hover:underline-offset-2 cursor-pointer hover:text-yellow-500  active:text-yellow-700"
              >
                Continental
              </button>
            </li>
            <li>
              <button
                onClick={favourite_function}
                id="favouriteBtn"
                className="favouriteBtn hover:underline hover:underline-offset-2 cursor-pointer hover:text-yellow-500  active:text-yellow-700"
              >
                Most favourites
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* continental_div_start */}
      <div
        id={Style.continentaldiv}
        className=" continentalDiv invisible opacity-0 absolute top-40 sm:top-20 left-0 right-0 h-52 w-full"
      >
        <Continantal />
      </div>
      {/* continental_div_end */}
      {/* ---------------------------------------- */}
      {/* most_favourite_div_start */}
      <div
        id={Style.favouritediv}
        className="favouriteDiv invisible opacity-0 absolute top-40 sm:top-20 left-0 right-0 h-52 w-full"
      >
        <Most_Favourite />
      </div>
      {/* most_favourite_div_end */}

      {/* buy-cart_popupDiv-start */}
      <div
        id="buypopupDiv"
        className="h-screen bg-black fixed left-0 right-0 invisible"
      >
        <button
          onClick={onBackBtn}
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
          <form className=" sm:w-1/2 border items-center backdrop:filter backdrop-blur-3xl rounded-md  p-5 flex flex-col gap-3">
            <div className="w-full">
              <h1 className=" pl-2">Food Name:</h1>
              <input
                value={buyData.foodName}
                onChange={(e) =>
                  setOrderData({ ...orderData, foodname: e.target.value })
                }
                className=" pl-2 h-8 rounded-md text-black w-full"
              />
            </div>
            <div className="w-full">
              <h1 className=" pl-2">Price:</h1>
              <input
                value={buyData.foodPrice}
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
              {orderData.contact.length !== 0 ? null : (
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
              {orderData.address.length !== 0 ? null : (
                <h1 className=" text-red-500 text-center text-xs">
                  {emptyText.address}
                </h1>
              )}
            </div>
            <div className=" flex items-center justify-center">
              <Image
                src={buyData.foodImage}
                alt="img"
                width={100}
                height={100}
                className=" rounded-md"
              />
            </div>
            <div className=" flex items-center justify-center">
              <button
                className=" border w-52 rounded-md h-8 hover:bg-green-600 active:bg-green-700"
                onClick={onPlaceOrder}
              >
                Order Place
              </button>
            </div>
          </form>
        </div>
        {/* form_div_end*/}
      </div>
      {/* buy_cart-end */}
    </nav>
  );
}
