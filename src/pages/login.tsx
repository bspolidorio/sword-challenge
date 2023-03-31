import { useState } from "react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn, signUp } = useAuth();
  const [login, setLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
      setLogin(false);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-black md:items-center md:justify-center ">
      <Head>
        <title>Login - Sword Health Challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-24 space-y-8 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <div className="space-y-4">
          <label className="inline-block w-full">
            Email
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            Password
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>
        <div className="font-thin">
          Don&apos;t have an account?{" "}
          <button type="submit" className="text-white hover:underline">
            Click here to sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
