import Image from "next/image";
import { AnimatePresence, motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import useStorage from "@/details/store";

const first = [
  {
    img: "/salad1.webp",
    name: "Fattoush salad",
    description:
      "Middle Eastern mix of lettuce, tomatoes, cucumbers, radishes, and green onions with crispy flatbread, dressed in olive oil, lemon juice, and herbs like parsley and mint.",
    cost: "24.00",
    rating: "4.9",
  },
  {
    img: "/salad2.webp",
    name: "Vegetable salad",
    description:
      "A vibrant mix of fresh lettuce, tomatoes, cucumbers, bell peppers, carrots, and onions, topped with optional extras like cheese or protein, and dressed in vinaigrette or ranch dressing.",
    cost: "26.00",
    rating: "4.6",
  },
  {
    img: "/salad3.webp",
    name: "Egg vegi salad",
    description:
      "Hard-boiled eggs mixed with fresh veggies like lettuce, tomatoes, cucumbers, and bell peppers, topped with onions and dressed in vinaigrette or mayonnaise.",
    cost: "23.00",
    rating: "4.5",
  },
];

const second = [
  {
    name: "Cheesecake",
    description:
      "Rich and creamy dessert consisting of a sweetened cream cheese filling on a graham cracker or cookie crust, often topped with fruit or sauce.",
    cost: "9.00",
    rating: 4.6,
  },
  {
    name: "Tiramisu",
    description:
      "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder.",
    cost: "11.00",
    rating: 4.4,
  },
  {
    name: "Creme Brulee",
    description:
      "French dessert consisting of a rich custard base topped with a layer of caramelized sugar.",
    cost: "13.00",
    rating: 4.8,
  },
];

export default function Standout() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const res = useStorage((state) => state.cart);
  const items = Object.keys(res);

  const add = useStorage((state) => state.addToCart);

  const [dishes, setDishes] = useState(first);

  const leave = async () => {
    await animate(
      "#items",
      dishes == first
        ? { x: [0, -300], opacity: [1, 0] }
        : { x: [0, 300], opacity: [1, 0] },
      { duration: 0.5, type: "spring", times: [0, 1] }
    );
  };

  const appear = async () => {
    await animate(
      "#items",
      dishes == first
        ? { x: [300, 0], opacity: [0, 1] }
        : { x: [-300, 0], opacity: [0, 1] },
      { duration: 0.5, type: "spring", times: [0, 1] }
    );
  };

  const handleLeft = async () => {
    await leave();
    setDishes(first);
    await appear();
  };

  const handleRight = async () => {
    await leave();
    setDishes(second);
    await appear();
  };

  return (
    <div ref={ref} className="flex flex-col gap-5 mb-20 min-h-[100vh]">
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
        className="inline-block font-inter font-bold text-[#FF6868] text-md tracking-widest"
      >
        SPECIAL DISHES
      </motion.h2>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
        className="flex md:flex-row flex-col gap-3 md:justify-between"
      >
        <h1 className="font-inter font-extrabold text-4xl leading-relaxed">
          Standout Dishes <br /> From Our Menu
        </h1>
        <div className="mx-auto md:mx-0 flex flex-row gap-10 mb-4">
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { type: "spring", duration: 0.3 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { type: "spring", duration: 0.3 },
            }}
            onClick={handleLeft}
            disabled={dishes == first ? true : false}
            className="w-14 h-14 bg-[#EFEFEF] rounded-full shadow-lg flex items-center justify-center disabled:opacity-55"
          >
            <Image
              src="/left.webp"
              alt="left"
              width={100}
              height={100}
              className="w-6 h-6"
            />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.2,
              transition: { type: "spring", duration: 0.3 },
            }}
            whileTap={{
              scale: 1,
              transition: { type: "spring", duration: 0.3 },
            }}
            onClick={handleRight}
            disabled={dishes == second ? true : false}
            className="w-14 h-14 bg-[#39DB4A] rounded-full shadow-lg flex items-center justify-center disabled:opacity-55"
          >
            <Image
              src="/right.webp"
              alt="right"
              width={100}
              height={100}
              className="w-6 h-6"
            />
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
        className="mt-10"
      >
        <AnimatePresence>
          <motion.div
            id="items"
            className="flex flex-row flex-wrap justify-center lg:justify-evenly"
          >
            {dishes.map((item, index) => (
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.5, type: "spring" },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.3, type: "spring" },
                }}
                key={index}
                className="xl:w-[30%] lg:w-[45%] w-[80%] mt-10 py-10 px-10 rounded-3xl shadow-xl ring-1 ring-gray-100 flex flex-col"
                onClick={() => add(item.name, item.cost)}
              >
                <div className="xl:w-[4vw] xl:h-[4vw] w-[25%] h-[25%] bg-[#39DB4A] relative bottom-10 right-10 rounded-br-3xl rounded-tl-3xl flex items-center justify-center">
                  <Image
                    src={
                      items.includes(item.name) != false
                        ? "/heartFilled.webp"
                        : "/heartOutlined.webp"
                    }
                    alt="heart"
                    width={100}
                    height={100}
                    loading="lazy"
                    className="w-8 h-8 xl:w-6 xl:h-6"
                  />
                </div>
                {item.img != undefined ? (
                  <img
                    src={item.img}
                    alt="item"
                    loading="lazy"
                    className="w-48 h-48 relative bottom-14 mx-auto"
                  />
                ) : (
                  ""
                )}
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
                      alt="dollar"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="w-6 h-6"
                    />
                    {item.cost}
                  </h2>
                  <h2 className="flex flex-row gap-1 font-inter font-bold text-lg items-start">
                    <Image
                      src="/star.webp"
                      alt="star"
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
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
