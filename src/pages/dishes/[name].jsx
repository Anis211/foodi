import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import useStorage from "@/details/store";

export default function Main({ dishes, name }) {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const add = useStorage((state) => state.addToCart);
  const items = useStorage((state) => state.cart);

  const [length, setLength] = useState(9);

  return (
    <div className="flex flex-col gap-6 mb-20 pt-24 lg:px-32 px-8">
      <h2 className="font-inter font-extrabold text-3xl text-center mb-10">
        {name}
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-7">
        {dishes.slice(0, length).map((item, index) => (
          <motion.div
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, type: "spring" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.3, type: "spring" },
            }}
            key={index}
            className="xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[60%] py-10 px-10 rounded-3xl shadow-xl ring-1 ring-gray-100 flex flex-col"
            onClick={() => add(item.name, item.cost)}
          >
            <div className="xl:w-[4vw] xl:h-[4vw] w-[25%] h-[25%] py-3 md:py-0 bg-[#39DB4A] relative bottom-10 right-10 rounded-br-3xl rounded-tl-3xl flex items-center justify-center">
              <Image
                src={
                  !Object.keys(items).includes(item.name)
                    ? "/heartOutlined.png"
                    : "/heartFilled.png"
                }
                width={100}
                height={100}
                loading="lazy"
                className="w-8 h-8 xl:w-6 xl:h-6"
              />
            </div>
            <h2 className="font-inter font-semibold text-lg relative bottom-10">
              {item.name}
            </h2>
            <p className="font-inter font-regular text-md text-[#555555] relative bottom-8">
              {item.description}
            </p>
            <div className="flex flex-row justify-between">
              <h2 className="font-inter font-bold text-lg flex flex-row justify-self-end">
                <Image
                  src="/dollar.png"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="w-6 h-6"
                />
                {item.cost + ".00"}
              </h2>
              <h2 className="flex flex-row gap-1 font-inter font-bold text-lg items-start">
                <Image
                  src="/star.png"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="w-6 h-6"
                />{" "}
                {item.rating}
              </h2>
            </div>
          </motion.div>
        ))}
        {length < dishes.length ? (
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, type: "spring" },
            }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
            className="bg-[#39DB4A] lg:w-[30%] md:w-[60%] w-[90%] mt-8 mx-auto rounded-full font-inter text-white font-medium text-lg px-3 py-2 shadow-xl shadow-[#8EFF9A80]"
            onClick={() =>
              setLength((prev) =>
                prev + 9 <= dishes.length
                  ? prev + 9
                  : prev + dishes.length - prev
              )
            }
          >
            Load More
          </motion.button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const name = context.params.name;
  let data = [];

  if (name != "all") {
    const res = await fetch("https://foodi-4d1ff.web.app/api/dishes/" + name);
    data = await res.json();
  } else {
    const arr = ["dessert", "breakfast", "main"];

    for (let i = 0; i < arr.length; i++) {
      const res = await fetch(
        "https://foodi-4d1ff.web.app/api/dishes/" + arr[i]
      );
      const items = await res.json();

      data = [...data, ...items];
    }
  }

  const names = {
    main: "Main Dishes",
    breakfast: "Breakfast Dishes",
    dessert: "Desserts",
    all: "All Dishes",
  };

  return {
    props: {
      dishes: data,
      name: names[name],
    },
  };
}
