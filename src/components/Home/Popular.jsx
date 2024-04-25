import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Popular() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col gap-7 text-center lg:mt-32">
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
        className="inline-block font-inter font-bold text-[#FF6868] text-md tracking-widest"
      >
        CUSTOMER FAVORITES
      </motion.h2>
      <motion.h1
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
        className="inline-block font-inter font-bold xl:text-5xl md:text-4xl text-3xl"
      >
        Popular Catagories
      </motion.h1>
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : ""}
        transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
        className="flex flex-row flex-wrap gap-3 justify-evenly mb-32 mt-10"
      >
        {[
          {
            name: "Main Dish",
            img: "/burder.webp",
            remain: "86 dishes",
            link: "/dishes/main",
          },
          {
            name: "Break Fast",
            img: "/sandwich.webp",
            remain: "12 break fast",
            link: "/dishes/breakfast",
          },
          {
            name: "Dessert",
            img: "/icecream.webp",
            remain: "48 desserts",
            link: "/dishes/dessert",
          },
          {
            name: "Browse All",
            img: "/juice.webp",
            remain: "255 items",
            link: "/dishes/all",
          },
        ].map((item, index) => (
          <Link key={index} href={item.link}>
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, type: "spring" },
              }}
              whileTap={{
                scale: 0.9,
                transition: { type: "spring", duration: 0.3 },
              }}
              className="w-64 h-auto py-8 flex flex-col gap-3 md:drop-shadow-2xl md:shadow-xl ring-1 ring-gray-100 rounded-2xl"
            >
              <div className="px-4 py-4 w-28 h-28 bg-[#C1F1C6] rounded-full mx-auto flex">
                <Image
                  src={item.img}
                  alt="image"
                  loading="lazy"
                  width={100}
                  height={100}
                  className="self-center"
                />
              </div>
              <h3 className="font-inter font-bold text-xl">{item.name}</h3>
              <p className="font-inter font-medium text-[#555555]">
                ({item.remain})
              </p>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
