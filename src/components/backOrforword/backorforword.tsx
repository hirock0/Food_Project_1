"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Back_Forword() {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  const onForword = () => {
    router.forward();
  };

  return (
    <div className=" z-50 fixed top-0 flex justify-between items-center w-full pr-5 pl-5 pt-3 ">
      <div className="">
        <button
          onClick={onBack}
          className="border rounded-full hover:bg-green-800 hover:border-0 active:bg-green-800"
        >
          <Image
            src={"/all_svg/arrow-left-line.svg"}
            alt="back"
            width={25}
            height={25}
          />
        </button>
      </div>

      <div className="">
        <button
          onClick={onForword}
          className="border rounded-full hover:bg-green-800 hover:border-0 active:bg-green-800"
        >
          <Image
            src={"/all_svg/arrow-right-line.svg"}
            alt="back"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}
