import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useStorage from "@/details/store";

export default function Hero() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const router = useRouter();
  const [disable, setDisable] = useState(false);

  const cart = useStorage((state) => state.cart);
  const id = useStorage((state) => state.uid);

  useEffect(() => {
    Object.values(cart).length > 1 ? setDisable(false) : "";
  }, [cart]);

  return (
    <div className="flex flex-row gap-5 xl:mb-16 xl:mt-12 h-[100vh] xl:h-auto">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
        className="justify-self-center self-center flex flex-col gap-8 xl:w-[50%] w-full text-center xl:text-start"
      >
        <h2 className="font-inter font-extrabold lg:text-5xl md:text-4xl text-3xl leading-relaxed">
          Dive into Delights <br />
          Of Delectable <span className="text-[#39DB4A]">Foods</span>
        </h2>
        <p className="font-inter font-medium text-lg leading-relaxed tracking-wide">
          Where Each Plate Weaves a Story of Culinary{" "}
          <br className="hidden md:flex" /> Mastery and Passionate Craftsmanship
        </p>
        <div className="flex flex-row gap-8">
          <motion.button
            whileHover={
              !disable
                ? {
                    scale: 1.1,
                    transition: { duration: 0.5, type: "spring" },
                  }
                : ""
            }
            whileTap={
              !disable
                ? {
                    scale: 0.9,
                    transition: { duration: 0.5, type: "spring" },
                  }
                : ""
            }
            className="bg-[#39DB4A] xl:w-[30%] lg:w-[50%] md:w-[60%] w-[80%] mx-auto xl:mx-0 rounded-full font-inter text-white font-medium disabled:opacity-55 text-lg px-3 py-4 shadow-xl shadow-[#8EFF9A80]"
            disabled={disable}
            onClick={() => {
              if (id != null) {
                if (Object.values(cart).length > 0) {
                  router.push(`/order`);
                } else {
                  setDisable(true);
                }
              } else {
                router.push("/sign-in");
              }
            }}
          >
            Order Now
          </motion.button>
        </div>
      </motion.div>
      <div layout className="hidden xl:flex xl:flex-col xl:w-[50%]">
        <div className="w-[80%] h-[80%] bg-[#53EC62] rounded-full mt-16 self-center">
          <img
            src="/hero.webp"
            alt="hero"
            className="relative rounded-full w-[100%] h-[115%] bottom-[15%]"
          />
        </div>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.5 }}
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.6, type: "spring" },
          }}
          className="absolute top-[27%] right-[38%]"
        >
          <h2 className="flex flex-row gap-3 w-48 bg-white font-inter font-semibold text-red-500 text-md px-4 py-2 shadow-xl ring-1 ring-gray-100 rounded-full rounded-br-none">
            Hot spicy Food{" "}
            <Image
              src="/chili.webp"
              alt="chili"
              width={100}
              height={100}
              className="w-6 h-6"
            />
          </h2>
        </motion.div>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
          className="flex flex-row gap-5 absolute bottom-[10%] right-[13%]"
        >
          {[
            {
              name: "Spicy noodles",
              rating: 3,
              img: "/dish1.webp",
              cost: "18.00",
            },
            {
              name: "Vegetarain salad",
              rating: 4,
              img: "/dish2.webp",
              cost: "23.00",
            },
          ].map((item, index) => (
            <motion.div
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.6, type: "spring" },
              }}
              key={index}
              className="pl-3 py-3 w-56 shadow-lg rounded-xl flex flex-row gap-2 z-20 bg-white"
            >
              <img src={item.img} className="w-16 h-16 rounded-xl" />
              <div className="flex flex-col gap-1">
                <h2 className="font-inter font-semibold text-sm">
                  {item.name}
                </h2>
                <div className="flex flex-row gap-1">
                  {[0, 0, 0, 0, 0].map((item1, index) => {
                    return (
                      <img
                        key={index}
                        src={
                          item.rating - 1 >= index
                            ? "/star.webp"
                            : "/emptyStar.webp"
                        }
                        alt="item"
                        className="w-3 h-3"
                      />
                    );
                  })}
                </div>
                <h2 className="flex flex-row font-inter font-medium">
                  <img
                    src="/dollar.png"
                    alt="dollar"
                    className="w-3 h-3 self-center"
                  />
                  {item.cost}
                </h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
