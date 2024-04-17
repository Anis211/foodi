import { firestore } from "../../firebase/clientApp";
import { getDoc, doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Account({ user }) {
  return (
    <div className="pt-28 min-h-[100vh] flex flex-col gap-10">
      <h2 className="font-inter font-extrabold text-3xl text-center mb-10">
        Welcome Back {user.name}!
      </h2>
      <div className="w-[85%] mx-auto flex flex-row flex-wrap gap-[3%]">
        {user.orders.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5, type: "spring" },
            }}
            className="lg:w-[30%] md:w-[45%] w-[90%] mx-auto md:mx-0 h-auto mb-10 bg-white ring-1 ring-gray-100 rounded-lg shadow-xl px-4 py-5"
          >
            <h2 className="font-inter font-bold text-lg text-center mb-5">
              Reciept on{" "}
              {item.date.day + "/" + item.date.month + "/" + item.date.year}
            </h2>
            <div className="flex flex-col gap-1">
              {Object.entries(item.items).map(([name, order], index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-row justify-between w-[100%]"
                  >
                    <div className="flex flex-row w-[85%] justify-between ml-3">
                      <h2 className="font-inter font-medium text-md w-[45%]">
                        {name}
                      </h2>
                      <div className="flex flex-row justify-between w-[55%]">
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
                  <div className="ring-1 ring-gray-200 w-[95%] mt-1 mb-1 mx-auto" />
                </>
              ))}
            </div>
            <div className="flex flex-row gap-1 mt-4 ml-3 font-inter font-bold text-md">
              <h2>{"Total: " + item.total + ".00"}</h2>
              <Image
                src="/dollar.png"
                alt="dollar"
                width={100}
                height={100}
                priority
                className="w-4 h-4 mt-1"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await getDoc(doc(firestore, "users", "account"));
  const data = res.data();
  const users = data.users;

  return {
    props: {
      user: users[id],
    },
  };
}
