import Image from "next/image";
import { motion, AnimatePresence, animate } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import useStorage from "@/details/store";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/clientApp";

export default function Navbar() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(false);
  const [search, setSearch] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  const id = useStorage((state) => state.uid);
  const add = useStorage((state) => state.addToCart);
  const remove = useStorage((state) => state.removeFromCart);
  const cart = useStorage((state) => state.cart);
  const change = useStorage((state) => state.changeTheNumber);
  const total = useStorage((state) => state.total);
  const setTotal = useStorage((state) => state.setTotal);
  const clearTotal = useStorage((state) => state.clearTotal);
  const removeId = useStorage((state) => state.removeUid);

  const plus = (item) => change(item, "more");
  const minus = (item) => change(item, "less");

  const router = useRouter();

  const [dishes, setDishes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([...dishes]);

  useEffect(() => {
    if (open == true) {
      handleTotal();
    }
  }, [cart]);

  useEffect(() => {
    setOpen(false);
    setSearch(true);
    setSidebar(false);
  }, [router.asPath]);

  const handleTotal = async () => {
    const func = async () => {
      clearTotal();
      Object.values(cart).forEach((item) => setTotal(item.count * item.cost));
    };

    await animate(
      "#total",
      { y: [0, -20], opacity: [1, 0] },
      { duration: 0.13, times: [0, 1] }
    );
    await func();
    await animate(
      "#total",
      { y: [20, 0], opacity: [0, 1] },
      { duration: 0.13, times: [0, 1] }
    );
  };

  const handleDecrease = async (item, index) => {
    await animate(
      "#num" + index,
      { y: [0, 20], opacity: [1, 0] },
      { duration: 0.13, times: [0, 1] }
    );
    await minus(item);
    await animate(
      "#num" + index,
      { y: [-20, 0], opacity: [0, 1] },
      { duration: 0.13, times: [0, 1] }
    );
  };

  const handleIncrease = async (item, index) => {
    await animate(
      "#num" + index,
      { y: [0, -20], opacity: [1, 0] },
      { duration: 0.13, times: [0, 1] }
    );
    await plus(item);
    await animate(
      "#num" + index,
      { y: [20, 0], opacity: [0, 1] },
      { duration: 0.13, times: [0, 1] }
    );
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredDishes = dishes.filter((dish) =>
      dish.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredDishes(filteredDishes);
  };

  const handleSearch = async () => {
    if (!router.asPath.includes("dishes")) {
      setFilteredDishes([
        { name: "main", link: "/dishes/main" },
        { name: "breakfast", link: "/dishes/breakfast" },
        { name: "dessert", link: "/dishes/dessert" },
        { name: "all", link: "/dishes/all" },
      ]);
    } else if (router.asPath.includes("dishes")) {
      const type =
        router.asPath.split("/")[router.asPath.split("/").length - 1];

      let data = [];

      if (type != "all") {
        const res = await fetch("http://localhost:3000/api/dishes/" + type);
        data = await res.json();
      } else {
        const arr = ["dessert", "breakfast", "main"];

        for (let i = 0; i < arr.length; i++) {
          const res = await fetch("http://localhost:3000/api/dishes/" + arr[i]);
          const items = await res.json();

          data = [...data, ...items];
        }
      }

      setDishes([...data.map((item) => item.name)]);
      setFilteredDishes([...data.map((item) => item.name)]);
    }

    setSearch(false);
  };

  const handleSignOut = () => {
    signOut(auth);
    removeId();
    router.push("/");
  };

  const filter = (item, index) => (
    <button
      onClick={() =>
        router.asPath.includes("dishes") ? add(item) : setSearch(true)
      }
    >
      <motion.h2
        key={index}
        className="w-[100%] font-inter font-medium text-md px-2 py-1"
      >
        {router.asPath.includes("dishes") ? (
          item
        ) : (
          <Link href={item.link}>{item.name}</Link>
        )}
      </motion.h2>
      <motion.div key={index} className="w-[100%] border-b-2" />
    </button>
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
      }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="flex flex-row gap-2 lg:justify-evenly justify-between w-[100%] pt-4 pb-6 fixed lg:px-32 px-8 bg-transparent backdrop-blur-md z-50"
    >
      <AnimatePresence>
        {sidebar ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white z-[6] flex flex-col gap-5 place-items-center justify-center absolute left-0 top-0 w-[100vw] h-[100vh]"
            onClick={() => setSidebar(false)}
          >
            {[
              { header: "Home", link: "/" },
              { header: "Menu", link: "/#menu" },
              { header: "Services", link: "/#services" },
              { header: "Offers", link: "/#offers" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="w-[60%]"
                onClick={() => setSidebar(false)}
              >
                <h2 className="font-poppins font-medium text-xl mx-auto text-center">
                  {item.header}
                </h2>
                <div className="border-b-2 border-b-gray-200 mt-4" />
              </Link>
            ))}
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
      <div className="lg:w-[20%] flex flex-row">
        <div className="py-2 px-1 bg-[#39DB4A] rounded-lg">
          <Image
            src="/f.webp"
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
      <AnimatePresence>
        {search ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-[40%] hidden lg:flex lg:flex-row lg:justify-evenly lg:items-center"
          >
            {[
              { header: "Home", link: "/" },
              { header: "Menu", link: "/#menu" },
              { header: "Services", link: "/#services" },
              { header: "Offers", link: "/#offers" },
            ].map((item, index) => (
              <Link key={index} href={item.link}>
                <h2 className="font-poppins font-regular text-md ">
                  {item.header}
                </h2>
              </Link>
            ))}
          </motion.div>
        ) : (
          <>
            <motion.input
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, type: "spring" }}
              type="text"
              placeholder="What type of meal would you prefer today?"
              onChange={handleChange}
              value={inputValue}
              className="pl-5 pr-3 py-2 w-[45%] rounded-full bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
            />
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, type: "spring" }}
              onClick={() => setSearch(true)}
              className="rounded-full px-2 py-2 bg-white shadow-xl ring-1 ring-gray-100"
            >
              <Image
                src="/close.webp"
                alt="close"
                width={100}
                height={100}
                priority
                className="w-6 h-6"
              />
            </motion.button>
          </>
        )}
      </AnimatePresence>
      <div className="lg:w-[40%] flex flex-row lg:gap-8 gap-4 items-center lg:justify-end">
        {!router.asPath.includes("order") ? (
          <button onClick={handleSearch} className="hidden lg:flex">
            <lord-icon
              src="https://cdn.lordicon.com/unukghxb.json"
              trigger="hover"
              stroke="bold"
              style={{ width: "1.8rem", height: "1.8rem" }}
            ></lord-icon>
          </button>
        ) : (
          ""
        )}
        {!router.asPath.includes("order") ? (
          <button onClick={() => setOpen(!open)}>
            <lord-icon
              src="https://cdn.lordicon.com/odavpkmb.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#121331,secondary:#000000"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          </button>
        ) : (
          ""
        )}
        <button
          onClick={() =>
            !router.asPath.includes("account")
              ? id != null
                ? router.push(`/account?id=${id}`)
                : router.push("/sign-in")
              : handleSignOut()
          }
        >
          {!router.asPath.includes("account") ? (
            <lord-icon
              src="https://cdn.lordicon.com/kthelypq.json"
              trigger="hover"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
              style={{ width: "2rem", height: "2rem" }}
            ></lord-icon>
          )}
        </button>
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="px-4 py-5 xl:w-[35vw] md:w-[55vw] w-[90vw] max-h-[80vh] overflow-y-scroll overflow-x-hidden scroll-ul-2 top-[15vw] md:top-[10vw] lg:top-[7vw] left-[5vw] md:left-[40vw] lg:left-[55vw] shadow-xl rounded-xl absolute ring-1 ring-gray-100 bg-white z-40 flex flex-col gap-3"
            >
              <div className="flex flex-row gap-2 justify-center w-[100%]">
                <Image
                  src="/smile.webp"
                  alt="smile"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-6 h-6 -rotate-12"
                />
                <h2 className="font-inter font-bold text-xl text-center mb-5">
                  Your Order
                </h2>
                <Image
                  src="/yummy.webp"
                  alt="yummy"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-6 h-6 rotate-12"
                />
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="ml-[20%] absolute left-[70%]"
              >
                <Image
                  src="/close.webp"
                  alt="close"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-6 h-6"
                />
              </button>
              <AnimatePresence>
                {Object.entries(cart).map(([item, obj], index) => (
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    key={index}
                  >
                    <div className="flex flex-row justify-between w-[100%]">
                      <div className="flex flex-row w-[85%] justify-between ml-3">
                        <h2 className="font-inter font-medium text-lg w-[45%]">
                          {item}
                        </h2>
                        <div className="flex sm:flex-row flex-col ml-4 sm:ml-0 gap-3 sm:gap-0 justify-between w-[55%]">
                          <div className="flex flex-row gap-1 z-50">
                            <Image
                              src="/minus.webp"
                              alt="minus"
                              width={100}
                              height={100}
                              priority={true}
                              className="w-5 h-5 px-1 py-1 shadow-xl rounded-md ring-1 ring-gray-100"
                              onClick={() =>
                                obj.count > 1 ? handleDecrease(item, index) : ""
                              }
                            />
                            <div className="flex flex-row gap-1">
                              <motion.h2
                                id={"num" + index}
                                className="font-inter font-medium inline-block"
                              >
                                {obj.count}
                              </motion.h2>
                              <h2 className="font-inter font-medium">dishes</h2>
                            </div>
                            <Image
                              src="/plus.webp"
                              alt="plus"
                              width={100}
                              height={100}
                              priority={true}
                              className="w-5 h-5 px-1 py-1 mr-3 shadow-xl rounded-md ring-1 ring-gray-100"
                              onClick={() =>
                                obj.count < 99
                                  ? handleIncrease(item, index)
                                  : ""
                              }
                            />
                          </div>
                          <h2 className="font-inter font-medium flex felx-row gap-1">
                            {String(obj.count * obj.cost) + ".00"}
                            <Image
                              src="/dollar.png"
                              alt="dollar"
                              width={100}
                              height={100}
                              priority={true}
                              className="w-4 h-4 mt-1"
                            />
                          </h2>
                        </div>
                      </div>
                      <div className="flex justify-end z-40">
                        <Image
                          src="/close.webp"
                          alt="close"
                          width={100}
                          height={100}
                          priority={true}
                          className="w-6 h-6"
                          onClick={() => remove(item)}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="flex flex-row gap-1 mt-4 relative left-[70%] font-inter font-bold text-md">
                <h2>Total:</h2>
                <motion.h2 id="total" className="inline-block">
                  {total + ".00"}
                </motion.h2>
                <Image
                  src="/dollar.png"
                  alt="dollar"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-4 h-4 mt-1"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.9 }}
                className="w-[50%] mx-auto mt-5 flex flex-row gap-2 justify-center pl-4 pr-5 py-2 bg-[#39DB4A] rounded-full shadow-xl shadow-[#8EFF9A80]"
                onClick={() => router.push("/order")}
              >
                <h2 className="font-poppins font-regular text-white text-sm">
                  Order now
                </h2>
              </motion.button>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!search ? (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="max-h-[25vw] overflow-y-auto scroll-ul px-4 py-5 w-[35vw] top-[5vw] right-[41%] shadow-xl rounded-xl absolute ring-1 ring-gray-100 bg-white z-50 flex flex-col gap-3"
            >
              {filteredDishes.map(filter)}
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        {!router.asPath.includes("order") ? (
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, type: "spring" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, type: "spring" },
            }}
            className="flex flex-row gap-2 md:pl-4 md:pr-5 px-2 py-2 bg-[#39DB4A] rounded-full shadow-xl shadow-[#8EFF9A80]"
            onClick={() => setContact(true)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/rsvfayfn.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "1.5rem", height: "1.5rem" }}
            ></lord-icon>
            <h2 className="font-poppins font-regular hidden md:flex text-white text-sm self-center">
              Contact
            </h2>
          </motion.button>
        ) : (
          ""
        )}
        <button
          className="visible lg:hidden ring-1 ring-black px-1 py-1 rounded-full"
          onClick={() => setSidebar(true)}
        >
          <Image
            src="/more.webp"
            alt="search"
            priority
            width={100}
            height={100}
            className="w-6 h-6"
          />
        </button>
        <AnimatePresence>
          {contact ? (
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="px-4 py-5 xl:w-[25vw] md:w-[55vw] w-[90vw] top-[15vw] md:top-[10vw] lg:top-[7vw] left-[5vw] md:left-[40vw] lg:left-[70vw] shadow-xl rounded-xl absolute ring-1 ring-gray-100 bg-white z-40 flex flex-col gap-3"
            >
              <div className="flex flex-row gap-2 justify-center w-[100%]">
                <h2 className="font-inter font-bold text-xl text-center">
                  Contact Us
                </h2>
              </div>
              <button
                onClick={() => setContact(false)}
                className="ml-[20%] absolute left-[70%]"
              >
                <Image
                  src="/close.webp"
                  alt="close"
                  width={100}
                  height={100}
                  priority
                  className="w-6 h-6"
                />
              </button>
              {[
                { header: "Phone Number", body: "8 705 602 12 56" },
                { header: "Email", body: "anishejioov@gmail.com" },
                { header: "Our Address", body: "Colifornia, Los Angeles" },
              ].map((item, index) => (
                <div key={index} className="flex flex-row gap-1">
                  <h2 className="font-inter font-medium text-md">
                    {item.header + ":"}
                  </h2>
                  <p className="font-inter font-regular text-md">{item.body}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
