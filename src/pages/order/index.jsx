import { useEffect } from "react";
import useStorage from "@/details/store";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Order() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const items = useStorage((state) => state.cart);
  const total = useStorage((state) => state.total);

  const router = useRouter();
  const date = new Date();

  return (
    <div className="pt-28">
      <motion.div
        initial={{ y: -60, opecity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className={`mx-auto md:w-[80%] w-[90%] rounded-xl shadow-xl ring-1 ring-gray-100 lg:px-4 lg:py-5 px-2 py-3`}
      >
        <h2 className="font-inter font-extrabold text-2xl text-center">
          Your Order
        </h2>
        <div className="md:w-[80%] w-[90%] mx-auto text-center h-auto px-4 py-3">
          <h2 className="font-inter font-bold text-lg text-center mb-5">
            Reciept on{" "}
            {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
          </h2>
          {Object.entries(items).map(([name, order], index) => (
            <div
              key={index}
              className="flex flex-row justify-between md:w-[80%] w-[100%]"
            >
              <div className="flex flex-row w-[100%] md:w-[85%] justify-between">
                <h2 className="font-inter font-medium text-md md:w-[45%] w-[50%] text-start">
                  {name}
                </h2>
                <div className="flex flex-row justify-between md:w-[55%] w-[50%]">
                  <h2 className="font-inter font-medium">
                    {order.count + " dishes"}
                  </h2>
                  <h2 className="font-inter font-medium flex felx-row gap-1">
                    {String(order.count * order.cost) + ".00"}
                    <Image
                      src="/dollar.png"
                      alt="dollar"
                      width={100}
                      height={100}
                      priority
                      className="w-4 h-4 mt-1"
                    />
                  </h2>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-row gap-1 mt-10 font-inter font-bold text-md">
            <h2>{"Total: " + total + ".00"}</h2>
            <Image
              src="/dollar.png"
              alt="dollar"
              width={100}
              height={100}
              priority
              className="w-4 h-4 mt-1"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.9 }}
          className="xl:w-[40%] lg:w-[50%] md:w-[65%] w-[80%] mx-auto mt-5 flex flex-row gap-2 justify-center pl-4 pr-5 py-2 bg-[#39DB4A] rounded-full shadow-xl shadow-[#8EFF9A80]"
          onClick={() => router.push("/order/pay")}
        >
          <h2 className="font-poppins font-regular text-white text-sm">
            Pay for your order
          </h2>
        </motion.button>
      </motion.div>
    </div>
  );
}
