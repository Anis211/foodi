import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Story() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex lg:flex-row flex-col xl:gap-10 gap-12 mb-24">
      <div className="flex flex-col gap-8 xl:w-[50%] mx-auto text-center lg:text-start xl:mx-0">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="inline-block font-inter font-bold text-lg text-[#FF6868]"
        >
          OUR STORY & SERVICES
        </motion.h2>
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
          className="inline-block font-inter font-extrabold text-4xl"
        >
          Our Culinary Journey <br /> And Services
        </motion.h1>
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
          className="inline-block font-inter font-medium text-md text-[#555555]"
        >
          Rooted in passion, we curate unforgettable dining <br /> experiences
          and offer exceptional services, <br /> blending culinary artistry with
          warm hospitality.
        </motion.p>
      </div>
      <div className="lg:w-[50%] lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:mt-0 flex flex-row flex-wrap mt-10 justify-center gap-4">
        {[
          {
            name: "CATERING",
            body: "Delight your guests with our flavors and  presentation.",
            img: "/food.png",
          },
          {
            name: "FAST DELIVERY",
            body: "We deliver your order promptly to your door.",
            img: "/delivery.png",
          },
          {
            name: "ONLINE ORDERING",
            body: "Explore menu & order with ease using our Online Ordering.",
            img: "/online.png",
          },
          {
            name: "GIFT CARDS",
            body: "Give the gift of exceptional dining with Foodi Gift Cards.",
            img: "/gift.png",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 60, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : ""}
            transition={{
              duration: 0.6,
              type: "spring",
              delay: index != 0 && index != 1 ? 0.6 : 0.4,
            }}
            whileHover={{
              scale: 1.1,
              y: index != 0 && index != 1 ? 30 : -30,
              transition: { duration: 0.3, type: "spring" },
            }}
            className="lg:w-[80%] w-[70%] md:w-[45%] px-2 py-6 rounded-xl shadow-xl ring-1 ring-gray-100 flex flex-col gap-2"
          >
            <Image
              src={item.img}
              alt="image"
              width={100}
              height={100}
              loading="lazy"
              className="w-16 h-16 mx-auto"
            />
            <h2 className="font-inter font-bold text-md text-center text-[#5FE26C]">
              {item.name}
            </h2>
            <p className="w-[80%] mx-auto font-inter font-medium text-md text-center text-[#90BD95]">
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
