import Header from "@/components/Header";
import { toasterStyles } from "@/styles/toaster";
import { updateEmail, updateProfile } from "firebase/auth";
import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../firebase";
import useAuth from "../hooks/useAuth";

interface Inputs {
  newEmail: string;
  newUsername: string;
}

function Account() {
  const { user, logout, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ newEmail, newUsername }) => {
    if (!auth.currentUser) return;
    try {
      updateProfile(auth.currentUser, {
        displayName: newUsername,
      });
      if (newEmail) {
        await updateEmail(auth.currentUser, newEmail);
      }

      toast(`Your account has been updated`, {
        duration: 3000,
        style: toasterStyles,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return null;

  return (
    <div>
      <Head>
        <title>Account Settings - Sword Health Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-24 space-y-8 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
          >
            <div className="space-y-4">
              <label className="inline-block w-full">
                Email
                <input
                  type="email"
                  placeholder="New email"
                  className="input"
                  {...register("newEmail")}
                />
                {errors.newEmail && (
                  <p className="p-1 text-[13px] font-light text-orange-500">
                    Please enter a valid email.
                  </p>
                )}
              </label>
              <label className="inline-block w-full">
                Username*
                <input
                  type="text"
                  placeholder="New username"
                  className="input"
                  defaultValue={user?.displayName || ""}
                  {...register("newUsername", { required: true })}
                />
                {errors.newUsername && (
                  <p className="p-1 text-[13px] font-light text-orange-500">
                    Please enter a username.
                  </p>
                )}
              </label>
            </div>
            <button className="w-full rounded bg-[#e50914] py-3 font-semibold">
              Save
            </button>
          </form>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
}

export default Account;
