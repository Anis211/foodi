import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex flex-col gap-7 mb-16 lg:px-32 px-8">
      <div className="flex md:flex-row flex-col gap-6 mb-10 mt-20">
        <div className="flex flex-col gap-7 w-72">
          <div className="flex flex-row">
            <div className="py-2 px-1 bg-[#39DB4A] rounded-lg">
              <Image
                src="/f.png"
                alt="f"
                priority
                width={100}
                height={100}
                className="w-6 h-6"
              />
            </div>
            <h2 className="font-inter font-extrabold text-2xl text-black self-center pl-1">
              OODI
            </h2>
          </div>
          <p className="font-inter font-medium text-md text-[#555555]">
            Savor the artistry where <br />
            every dish is a culinary <br /> masterpiece
          </p>
        </div>
        <div className="w-[70%] flex flex-row flex-wrap gap-6 justify-between md:justify-evenly">
          {[
            {
              header: "Usefull links",
              body: ["About us", "Events", "Blogs", "FAQ"],
            },
            {
              header: "Main Menu",
              body: ["Home", "Offers", "Menus", "Reservation"],
            },
            {
              header: "Contact us",
              body: [
                "anishejioov@gmail.com",
                "8 705 602 12 56",
                "Social Media",
              ],
            },
          ].map((column, index) => (
            <div key={index} className="flex flex-col gap-7 mt-5">
              <h2 className="font-inter font-bold text-lg">{column.header}</h2>
              {column.body.map((item, index) => (
                <p
                  key={index}
                  className="font-inter font-medium text-md text-[#555555]"
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-20">
        <div className="flex flex-row gap-4">
          {[
            "/facebook.png",
            "/instagram.png",
            "/twitter.png",
            "/youtube.png",
          ].map((image, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index != 0 ? "bg-[#EDFFEF]" : "bg-[#39DB4A]"
              }`}
            >
              <Image
                src={image}
                alt="image"
                width={100}
                height={100}
                loading="lazy"
                className="w-6 h-6"
              />
            </div>
          ))}
        </div>
        <h2 className="font-inter font-medium text-md text-[#555555] my-auto ml-[15%]">
          Copyright 2023 Dscode | All rights reserved
        </h2>
      </div>
    </div>
  );
}
