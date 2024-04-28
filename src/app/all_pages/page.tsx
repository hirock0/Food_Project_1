import Nav from "@/components/nav/nav";
import Style from "./allPage.module.css";
import Image from "next/image";
import { HomeApi } from "@/api_data/home_page_api/home_api";
import Link from "next/link";
import Cart from "./cart/cart";
const HoepageApiData = (e: any) => {
  const HomeApiData = HomeApi;
  const filterData = HomeApiData.filter((item: any) => {
    const filtered =
      item.food1.title.toLowerCase().includes(e.toLowerCase()) ||
      item.food2.title.toLowerCase().includes(e.toLowerCase()) ||
      item.food3.title.toLowerCase().includes(e.toLowerCase()) ||
      item.food4.title.toLowerCase().includes(e.toLowerCase());
    return filtered;
  });

  return filterData;
};

export default function All_Pages(params: any) {
  const searchdata = params?.searchdetails?.q || "";
  const apiData: any = HoepageApiData(searchdata);
  return (
    <main className=" text-white">
      {/* nav_section_start */}
      <Nav />
      {/* nav_section_end */}
      <div id={Style.main} className=" w-full h-full bg-gray-500 ">
        <div
          id={Style.inMain}
          className=" w-full  pr-10 pl-10 max-sm:pr-5 max-sm:pl-5 h-full "
        >
          {/* hero_image_start */}

          <div
            id={Style.heroImage}
            className=" heroimageDiv relative rounded-md w-full h-72  mt-5 backdrop:filter backdrop-blur-3xl opacity-90"
          >
            <h1 className=" text-center underline underline-offset-4">
              Fantastic Foods Here
            </h1>
            <p
              id={Style.fantasticTextDiv}
              className=" pr-5 pl-5 max-sm:text-xs mt-2"
            >
              Delicious and nutritious food fuels our bodies with vitality and
              pleasure. Vibrant fruits, crisp vegetables, and lean proteins
              offer a symphony of flavors and essential nutrients in every bite.
              From the crunch of fresh salads to the warmth of homemade soups,
              wholesome meals nourish us from within. Choosing such foods not
              only supports our physical health but also enhances our overall
              well-being and satisfaction. So, let's savor each mouthful,
              knowing it's a step towards a healthier, happier life.
            </p>
          </div>

          {/* hero_image_end */}
          {/* foods_sections_start */}
          <div className="  mt-4 flex flex-col gap-5 pb-10">
            {apiData.length !== 0 ? (
              apiData.map((item: any) => (
                <div
                  key={item.id}
                  className=" flex justify-center max-sm:flex-col max-sm:items-center gap-5"
                >
                  <div className=" lg:flex lg:gap-5 w-full">
                    <div className="  items-center justify-center flex rounded-md w-52 h-52 max-sm:h-72 sm:h-72  sm:w-full max-sm:w-full overflow-hidden ">
                      <div className=" relative  ">
                        <Image
                          src={item.food1.image}
                          alt="image"
                          width={500}
                          height={500}
                          className=" hover:scale-110 transition-all"
                        />
                        <div className=" pr-5 pl-5 absolute w-full h-1/2 bottom-0 backdrop:filter backdrop-blur-3xl opacity-80">
                          <h1 className=" text-center">{item.food1.title}</h1>
                          <h1 className=" flex  justify-center gap-1">
                            <span>Price:</span>
                            <span>{item.food1.price}</span>
                          </h1>
                          <div className=" flex items-center justify-center mt-2">
                            <Link
                              href={`/order_page/${item.food1.title}?id=${item.id}?${item.food1.id}`}
                            >
                              <button className=" hover:bg-emerald-800 active:bg-emerald-900 bg-emerald-700 rounded-md w-52 h-8 max-sm:h-6 max-sm:text-xs max-sm:w-40">
                                Buy Now
                              </button>
                            </Link>
                          </div>
                          {/* cart_start */}

                          <Cart
                            cartDetails={[
                              item.food1.title,
                              item.id,
                              item.food1.id,
                              item.food1.image,
                              item.food1.price,
                            ]}
                          />

                          {/* cart_end */}
                        </div>
                      </div>
                    </div>
                    <div className="  items-center justify-center flex rounded-md w-52 h-52 max-sm:h-72 sm:h-72  sm:w-full max-sm:w-full overflow-hidden  mt-5 lg:mt-0">
                      <div className="relative">
                        <Image
                          src={item.food2.image}
                          alt="image"
                          width={500}
                          height={500}
                          className=" hover:scale-110 transition-all"
                        />
                        <div className=" absolute w-full h-2/4 bottom-0 backdrop:filter backdrop-blur-3xl opacity-80">
                          <h1 className=" text-center">{item.food2.title}</h1>
                          <h1 className=" flex  justify-center gap-1">
                            <span>Price:</span>
                            <span>{item.food2.price}</span>
                          </h1>
                          <div className=" flex items-center justify-center mt-2">
                            <Link
                              href={`/order_page/${item.food2.title}?id=${item.id}?${item.food2.id}`}
                            >
                              <button className=" hover:bg-emerald-800 active:bg-emerald-900 bg-emerald-700 rounded-md w-52 h-8 max-sm:h-6 max-sm:text-xs max-sm:w-40">
                                Buy Now
                              </button>
                            </Link>
                          </div>
                          {/* cart_start */}

                          <Cart
                            cartDetails={[
                              item.food2.title,
                              item.id,
                              item.food2.id,
                              item.food2.image,
                              item.food2.price,
                            ]}
                          />

                          {/* cart_end */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" lg:flex lg:gap-5 w-full">
                    <div className=" items-center justify-center flex rounded-md w-52 h-52 max-sm:h-72 sm:h-72   sm:w-full max-sm:w-full overflow-hidden ">
                      <div className=" relative">
                        <Image
                          src={item.food3.image}
                          alt="image"
                          width={500}
                          height={500}
                          className=" hover:scale-110 transition-all"
                        />
                        <div className=" absolute w-full h-2/4 bottom-0 backdrop:filter backdrop-blur-3xl opacity-80">
                          <h1 className=" text-center">{item.food3.title}</h1>
                          <h1 className=" flex  justify-center gap-1">
                            <span>Price:</span>
                            <span>{item.food3.price}</span>
                          </h1>
                          <div className=" flex items-center justify-center mt-2">
                            <Link
                              href={`/order_page/${item.food3.title}?id=${item.id}?${item.food3.id}`}
                            >
                              <button className=" hover:bg-emerald-800 active:bg-emerald-900 bg-emerald-700 rounded-md w-52 h-8 max-sm:h-6 max-sm:text-xs max-sm:w-40">
                                Buy Now
                              </button>
                            </Link>
                          </div>
                          {/* cart_start */}

                          <Cart
                            cartDetails={[
                              item.food3.title,
                              item.id,
                              item.food3.id,
                              item.food3.image,
                              item.food3.price,
                            ]}
                          />

                          {/* cart_end */}
                        </div>
                      </div>
                    </div>
                    <div className="items-center justify-center flex rounded-md w-52 h-52 max-sm:h-72 sm:h-72  sm:w-full max-sm:w-full overflow-hidden  mt-5 lg:mt-0">
                      <div className=" relative">
                        <Image
                          src={item.food4.image}
                          alt="image"
                          width={500}
                          height={500}
                          className=" hover:scale-110 transition-all"
                        />
                        <div className=" absolute w-full h-2/4 bottom-0 backdrop:filter backdrop-blur-3xl opacity-80">
                          <h1 className=" text-center">{item.food4.title}</h1>
                          <h1 className=" flex  justify-center gap-1">
                            <span>Price:</span>
                            <span>{item.food4.price}</span>
                          </h1>
                          <div className=" flex items-center justify-center mt-2">
                            <Link
                              href={`/order_page/${item.food4.title}?id=${item.id}?${item.food4.id}`}
                            >
                              <button className=" hover:bg-emerald-800 active:bg-emerald-900 bg-emerald-700 rounded-md w-52 h-8 max-sm:h-6 max-sm:text-xs max-sm:w-40">
                                Buy Now
                              </button>
                            </Link>
                          </div>
                          {/* cart_start */}

                          <Cart
                            cartDetails={[
                              item.food4.title,
                              item.id,
                              item.food4.id,
                              item.food4.image,
                              item.food4.price,
                            ]}
                          />

                          {/* cart_end */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className=" h-screen text-black">
                <h1 className=" text-center">File does not exist...</h1>
              </div>
            )}
          </div>
          {/* foods_sections_end */}
        </div>
      </div>
      {/* bottom_section_start */}
      <div className=" bg-black max-sm:text-xs pb-10">
        <div className=" pt-5">
          <h1 className=" text-center  text-base">You can contact us:-</h1>
          <div className=" mt-5">
            <ul className=" flex gap-4 justify-around">
              <Link
                href={"https://www.facebook.com/profile.php?id=100028605347325"}
              >
                <li className=" flex flex-col items-center">
                  <span>
                    <Image
                      src={"/all_svg/facebook.svg"}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </span>
                  <span className=" active:text-yellow-200">facebook</span>
                </li>
              </Link>
              <Link
                href={"https://www.facebook.com/profile.php?id=100028605347325"}
              >
                <li className=" flex flex-col items-center">
                  <span>
                    <Image
                      src={"/all_svg/facebook-messenger.svg"}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </span>
                  <span className=" active:text-yellow-200">messenger</span>
                </li>
              </Link>
              <Link
                href={"https://call.whatsapp.com/video/pkKVTMi8Yl6mXj6uqLqDPS"}
              >
                <li className=" flex flex-col items-center">
                  <span>
                    <Image
                      src={"/all_svg/whatsapp-fill.svg"}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </span>
                  <span className=" active:text-yellow-200">whatsapp</span>
                </li>
              </Link>
              <Link href={""}>
                <li className=" flex flex-col items-center">
                  <span>
                    <Image
                      src={"/all_svg/linkedin.svg"}
                      alt=""
                      height={20}
                      width={20}
                    />
                  </span>
                  <span className=" active:text-yellow-200">linkedin</span>
                </li>
              </Link>
              <Link
                className=" max-sm:hidden"
                href={"https://www.instagram.com/hirockdutta1998/"}
              >
                <li className=" flex flex-col items-center">
                  <span>
                    <Image
                      src={"/all_svg/instagram.svg"}
                      alt=""
                      height={25}
                      width={25}
                    />
                  </span>
                  <span className=" active:text-yellow-200">instagram</span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="border-t mt-5 mb-5"></div>
          <h1 className=" text-center text-base mb-2 underline underline-offset-4">
            Address
          </h1>
          <div className=" flex justify-center p-5">
            <div className=" border w-full flex flex-col items-center">
              <h1 className=" text-center underline underline-offset-4 text-sm">
                Shop-1
              </h1>

              <div className=" mt-2">
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/map-pin-line.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Manirampur,Jahore, Khuna,Bangladesh</span>
                </div>
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/roadster-fill.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Kultia,Road 101</span>
                </div>
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/smartphone-fill.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Mobile: 01700554293, 0194505264</span>
                </div>
              </div>
            </div>

            <div className=" border w-full flex flex-col items-center">
              <h1 className=" text-center underline underline-offset-4 text-sm">
                Shop-2
              </h1>

              <div className=" mt-2">
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/map-pin-line.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Manirampur,Jahore, Khuna,Bangladesh</span>
                </div>
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/roadster-fill.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Kultia,Road 101</span>
                </div>
                <div className=" flex gap-1">
                  <span>
                    <Image
                      src={"/all_svg/smartphone-fill.svg"}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </span>
                  <span>Mobile: 01700554293, 0194505264</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* bottom_section_end */}
    </main>
  );
}
