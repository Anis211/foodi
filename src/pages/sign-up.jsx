import { auth, firestore } from "../../firebase/clientApp";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStorage from "@/details/store";

export default function SignUp() {
  useEffect(() => {
    useStorage.persist.rehydrate();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const add = useStorage((state) => state.addUid);
  const router = useRouter();

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSuccess = async (id, name) => {
    const appear = async () => {
      add(id);
      setSuccess(true);
    };

    const res = await getDoc(doc(firestore, "users", "account"));
    const data = res.data();

    await setDoc(doc(firestore, "users", "account"), {
      users: {
        ...data.users,
        [id]: {
          name: name,
          orders: [],
        },
      },
    });

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

    setTimeout(() => router.push(`/account?id=${id}`), 1000);
  };

  const handleFailed = async () => {
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
  };

  return (
    <div className="pt-28 flex flex-col gap-10">
      <motion.div
        id="failed"
        className={`bg-red-300 ${
          failed ? "visible" : "hidden"
        } xl:w-[20vw] lg:w-[30vw] md:w-[40vw] w-[80vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-red-300 ring-1 ring-red-400 text-red-500 font-inter`}
      >
        <h2 className="font-bold text-lg">Error</h2>
        <p className="font-medium text-md">{error}</p>
      </motion.div>
      <motion.div
        id="success"
        className={`bg-green-300 ${
          success ? "visible" : "hidden"
        } xl:w-[20vw] lg:w-[30vw] md:w-[40vw] w-[80vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-green-300 ring-1 ring-green-400 text-green-500 font-inter`}
      >
        <h2 className="font-bold text-lg">Success</h2>
        <p className="font-medium text-md">{name}</p>
      </motion.div>
      <div className="w-[80%] mx-auto px-6 py-8 bg-white shadow-xl rounded-lg ring-1 ring-gray-100">
        <h2 className="font-inter font-extrabold text-3xl text-center">
          Sign Up
        </h2>
        <form
          onSubmit={handleSubmit((data) => {
            setPass1(data.password1);
            setPass2(data.password2);

            if (pass1 === pass2) {
              createUserWithEmailAndPassword(auth, data.email, data.password1)
                .then((userCredentials) => {
                  setName(userCredentials.user.email);
                  handleSuccess(
                    userCredentials.user.uid,
                    userCredentials.user.name
                  );
                })
                .catch((error) => {
                  setFailed(true);
                  setError(error.message);
                  handleFailed();
                });
            } else {
              setFailed(true);
              setError(
                "Something went wrong, try signing up one more time later!"
              );
              handleFailed();
            }
          })}
          className="flex flex-col gap-4 pt-5"
        >
          <h2 className="font-inter font-bold text-lg">Name: </h2>
          <input
            type="text"
            {...register("name", {
              required: "You need to write down your name!",
            })}
            className="pl-5 pr-3 py-2 w-[100%] mx-auto rounded-lg bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
          />
          {errors.name && (
            <p className="font-inter font-regular text-red-500 text-md">
              {errors.name.message}
            </p>
          )}
          <h2 className="font-inter font-bold text-lg">Email: </h2>
          <input
            type="email"
            {...register("email", {
              required: "You need to write down your email!",
            })}
            className="pl-5 pr-3 py-2 w-[100%] mx-auto rounded-lg bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
          />
          {errors.email && (
            <p className="font-inter font-regular text-red-500 text-md">
              {errors.email.message}
            </p>
          )}
          <h2 className="font-inter font-bold text-lg">Password: </h2>
          <input
            type="password"
            {...register("password1", {
              required: "It is a bad idea to play with your accounts password!",
              minLength: {
                value: 8,
                message:
                  "Your password must have at least 8 characters, for the security reasons!",
              },
            })}
            className="pl-5 pr-3 py-2 w-[100%] mx-auto rounded-lg bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
          />
          {errors.password1 && (
            <p className="font-inter font-regular text-red-500 text-md">
              {errors.password1.message}
            </p>
          )}
          <h2 className="font-inter font-bold text-lg">
            Repeat Your Password:{" "}
          </h2>
          <input
            type="password"
            {...register("password2", {
              required: "It is a bad idea to play with your accounts password!",
              minLength: {
                value: 8,
                message:
                  "Your password must have at least 8 characters, for the security reasons!",
              },
            })}
            className="pl-5 pr-3 py-2 w-[100%] mx-auto rounded-lg bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
          />
          {errors.password2 && (
            <p className="font-inter font-regular text-red-500 text-md">
              {errors.password2.message}
            </p>
          )}
          {pass1 !== pass2 && (
            <p className="font-inter font-regular text-red-500 text-md">
              Your passwords do not match!
            </p>
          )}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, type: "spring" },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.2, type: "spring" },
            }}
            disabled={pass1 !== pass2}
            className="dissabled:opacity-55 flex flex-row w-[90%] mx-auto gap-2 pl-4 pr-5 py-2 mt-5 bg-[#39DB4A] rounded-full shadow-xl shadow-[#8EFF9A80]"
          >
            <h2 className="font-poppins font-medium text-white text-md mx-auto">
              Sign up
            </h2>
          </motion.button>
        </form>
      </div>
    </div>
  );
}
