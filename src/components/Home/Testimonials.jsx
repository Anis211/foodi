import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-row gap-20 mt-28">
      <div className="w-[50%] hidden xl:block">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="w-[24vw] h-[18vw] bg-[#53EC62] rounded-b-3xl rounded-t-full mx-auto -mb-[28vw]"
        />
        <motion.img
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          src="/chef.png"
          alt="chef"
          loading="lazy"
          className="w-[20vw] h-[28vw] mx-auto relative z-10"
        />
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
        >
          <h2 className="z-30 flex flex-row gap-2 font-inter font-semibold text-md bg-white w-[12vw] pr-2 pl-6 py-2 ring-1 ring-gray-100 rounded-xl rounded-tl-none shadow-lg relative bottom-[1vw] left-[25.5vw]">
            Our Best Chef
            <Image
              src="/smile.png"
              alt="smile"
              width={100}
              height={100}
              loading="lazy"
              className="w-6 h-6"
            />
          </h2>
        </motion.div>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
        >
          <Image
            src="/yummy.png"
            alt="yummy"
            width={100}
            height={100}
            loading="lazy"
            className="w-9 h-9 mx-auto relative right-[11.8vw] bottom-[11vw] -rotate-12"
          />
        </motion.div>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
        >
          <Image
            src="/pizza.png"
            width={100}
            height={100}
            loading="lazy"
            className="w-8 h-8 mx-auto relative bottom-[15.5vw] left-[11.5vw] rotate-12"
          />
        </motion.div>
      </div>
      <div className="xl:w-[50%] mx-auto w-full xl:mx-0 text-center flex flex-col gap-10 lg:gap-5 xl:-mt-20">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="inline-block font-inter font-bold text-lg tracking-widest text-[#FF6868]"
        >
          TESTIMONIALS
        </motion.h2>
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
          className="inline-block font-inter font-extrabold text-3xl md:text-4xl leading-relaxed"
        >
          What Our Customers <br className="hidden md:flex" /> Say About Us
        </motion.h1>
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
          className="inline-block font-inter font-medium text-lg md:text-md text-[#555555]"
        >
          “I had the pleasure of dining at Foodi last night, and{" "}
          <br className="hidden md:flex" /> I'm still raving about the
          experience! The attention to <br className="hidden md:flex" /> detail
          in presentation and service was impeccable”
        </motion.p>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : ""}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
          className="flex flex-row gap-8 mx-auto xl:mx-0"
        >
          <div className="flex flex-row -space-x-5">
            {["/person1.webp", "/person2.webp", "/person3.jpg"].map(
              (image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="image"
                  className={`w-16 h-16 rounded-full ring-2 ring-white ring-offset-2 ring-offset-white`}
                />
              )
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-inter font-bold text-md">Customer Feedback</h2>
            <p className="font-inter font-semibold text-md flex flex-row gap-1">
              <Image
                src="/star.png"
                alt="star"
                width={100}
                height={100}
                loading="lazy"
                className="w-6 h-6"
              />
              <span className="mt-1">4.9</span>
              <span className="text-[#807E7E] mt-1">(18.5k Reviews)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
