"use client";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function Cart(props: any) {
  const router = useRouter();
  const allData = useSelector((state: any) => state.slices?.data || "");
  const logData = allData[0]?.loggedData || "";
  const loggedemailOrnumber = logData?.emailOrnumber || "";
  const onCart = async (e: any) => {
    try {
      const recentDate = new Date();
      const dateData = recentDate.toLocaleDateString();
      const cartSendData = {
        foodName: props?.cartDetails[0] || "",
        image: props?.cartDetails[3] || "",
        price: props?.cartDetails[4] || "",
        emailOrnumber: loggedemailOrnumber,
        date: dateData,
      };
      if (cartSendData.emailOrnumber == "") {
        alert("You are not logged in");
        router.push("user/login");
      } else {
       const sendCartData = await axios.post("/pages/api/cart", cartSendData);
        e.target.style.backgroundColor = "red";
        if(sendCartData.data.success){
          console.log("cart is added")
        }else{
            alert("something went wrong")
        }
        
      }
    } catch (error: any) {
      console.log("Something went wrong");
    }
  };
  return (
    <div className=" flex items-center justify-center mt-4">
      <button
        id="cart"
        onClick={onCart}
        className=" border w-52 h-8 rounded-md"
      >
        Cart
      </button>
    </div>
  );
}
