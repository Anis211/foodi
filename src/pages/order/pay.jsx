import { useEffect, useRef, useState } from "react";
import useStorage from "@/details/store";
import { useRouter } from "next/navigation";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { motion, animate } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Pay() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const router = useRouter();

  const total = useStorage((state) => state.total);
  const clearTotal = useStorage((state) => state.clearTotal);
  const clear = useStorage((state) => state.clearCart);
  const cart = useStorage((state) => state.cart);
  const id = useStorage((state) => state.uid);

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const date = new Date();

  const handleSuccess = async (order) => {
    const appear = async () => {
      const res = await getDoc(doc(firestore, "users", "account"));
      const user = res.data();

      await setDoc(doc(firestore, "users", "account"), {
        users: {
          [id]: {
            name: user.users[id].name,
            orders: [
              ...user.users[id].orders,
              {
                date: {
                  year: date.getFullYear(),
                  month: date.getMonth(),
                  day: date.getDate(),
                },
                items: cart,
                total: total,
              },
            ],
          },
        },
      });

      console.log(order);

      clear();
      clearTotal();
      setSuccess(true);
    };

    await appear();

    await animate(
      "#success",
      { opacity: [0, 1], y: [-100, 0] },
      { duration: 0.5, type: "spring", times: [0, 1] }
    );

    await animate(
      "#success",
      { opacity: [1, 0], y: [0, -100] },
      { duration: 0.5, type: "spring", times: [0, 1], delay: 1 }
    );

    router.push(`/account?id=${id}`);
  };

  const handleError = async (err) => {
    await animate(
      "#failed",
      { opacity: [0, 1], y: [-100, 0] },
      { duration: 0.5, type: "spring", times: [0, 1] }
    );
    await animate(
      "#failed",
      { opacity: [1, 0], y: [0, -100] },
      { duration: 0.5, type: "spring", times: [0, 1], delay: 1.5 }
    );

    setErrorMessage(err);
    setFailed(false);
  };

  return (
    <div className="pt-28">
      <motion.div
        id="failed"
        className={`bg-red-300 ${
          failed ? "visible" : "hidden"
        } w-[20vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-red-300 ring-1 ring-red-400 text-red-500 font-inter`}
      >
        <h2 className="font-bold text-lg">Error</h2>
        <p className="font-medium text-md">{errorMessage}</p>
      </motion.div>
      <motion.div
        id="success"
        className={`bg-green-300 ${
          success ? "visible" : "hidden"
        } w-[20vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-green-300 ring-1 ring-green-400 text-green-500 font-inter`}
      >
        <h2 className="font-bold text-lg">Success</h2>
        <p className="font-medium text-md">
          Your order is on it's way to be created!
        </p>
      </motion.div>
      <h2 className="font-inter font-bold text-2xl text-center mb-5">
        Pay for your order!
      </h2>
      <div className="xl:pl-[25%] md:pl-[15%] pl-0">
        <PayPalScriptProvider
          options={{ clientId: process.env.PAYPAL_CLIENT_ID, currency: "USD" }}
        >
          <PayPalButtons
            createOrder={(data, actions, res) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Payment from the Foodi Store",
                    amount: {
                      currency_code: "USD",
                      value: total,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const order = actions.order.capture();
              handleSuccess(order);
            }}
            onCancel={(err) => {
              handleError(err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
