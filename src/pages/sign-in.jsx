import { auth } from "../../firebase/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useStorage from "@/details/store";

export default function SignIn() {
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

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const [errorHead, setErrorHead] = useState("");
  const [errorBody, setErrorBody] = useState("");

  const handleSuccess = async (id) => {
    const appear = async () => {
      add(id);
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
    setFailed(false);
  };

  return (
    <div className="pt-28 pb-10 flex flex-col gap-10">
      <motion.div
        id="failed"
        className={`bg-red-300 ${
          failed ? "visible" : "hidden"
        } xl:w-[20vw] lg:w-[40vw] md:w-[60vw] w-[80vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-red-300 ring-1 ring-red-400 text-red-500 font-inter`}
      >
        <h2 className="font-bold text-lg">{errorHead}</h2>
        <p className="font-medium text-md">{errorBody}</p>
      </motion.div>
      <motion.div
        id="success"
        className={`bg-green-300 ${
          success ? "visible" : "hidden"
        } xl:w-[20vw] lg:w-[40vw] md:w-[60vw] w-[80vw] ml-10 px-3 py-2 absolute rounded-xl shadow-xl shadow-green-300 ring-1 ring-green-400 text-green-500 font-inter`}
      >
        <h2 className="font-bold text-lg">Success</h2>
        <p className="font-medium text-md">{email}</p>
      </motion.div>
      <div className="w-[80%] mx-auto px-6 py-8 bg-white shadow-xl rounded-lg ring-1 ring-gray-100">
        <h2 className="font-inter font-extrabold text-3xl text-center">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.email != "" && data.password != "") {
              signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredentials) => {
                  setEmail(userCredentials.user.email);
                  handleSuccess(userCredentials.user.uid);
                })
                .catch((error) => {
                  setFailed(true);
                  setErrorHead(error.type);
                  setErrorBody(error.message);
                  handleFailed();
                });
            } else {
              setFailed(true);
              setErrorHead("Error");
              setErrorBody("You have not filled all credentials!");
              handleFailed();
            }
          })}
          className="flex flex-col gap-4 pt-5"
        >
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
            {...register("password", {
              required: "It is a bad idea to play with your accounts password!",
              minLength: {
                value: 8,
                message:
                  "Your password must have at least 8 characters, for the security reasons!",
              },
            })}
            className="pl-5 pr-3 py-2 w-[100%] mx-auto rounded-lg bg-white shadow-xl ring-1 ring-gray-100 font-inter font-medium text-md text-gray-500"
          />
          {errors.password && (
            <p className="font-inter font-regular text-red-500 text-md">
              {errors.password1.message}
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
            className="flex flex-row w-[90%] mx-auto gap-2 pl-4 pr-5 py-2 mt-5 bg-[#39DB4A] rounded-full shadow-xl shadow-[#8EFF9A80]"
          >
            <h2 className="font-poppins font-medium text-white text-md mx-auto">
              Sign In
            </h2>
          </motion.button>
        </form>
        <h2
          className="font-inter font-regular text-md mt-5 text-center"
          onClick={() => router.push("/sign-up")}
        >
          Create an account by signing up
        </h2>
      </div>
    </div>
  );
}
