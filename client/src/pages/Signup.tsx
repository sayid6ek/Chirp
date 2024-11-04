import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/common/Spinner";

const reservedUsernames = [
  "login",
  "signup",
  "search",
  "notifications",
  "messages",
  "settings",
];

export type SignupFormData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type ErrorResponse = {
  message: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (formData: SignupFormData) => {
      const { data } = await axios.post("/api/auth/signup", formData);
      return data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
      toast({ title: "Account created successfully." });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Signup failed.",
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signup(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="p-4 w-full max-w-[400px] rounded-3xl">
        <h2 className="text-2xl font-bold text-center text-custom-black-2 mb-[17px]">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Name"
              autoComplete="off"
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 50,
                  message: "Cannot exceed 50 characters",
                },
              })}
              className={`bg-custom-gray-2 py-4 px-5 w-full rounded-xl focus:outline-none placeholder:text-gray-500 ${
                errors.name
                  ? "border border-custom-red-2 mb-[2px]"
                  : "mb-[16px]"
              }`}
            />
            {errors.name && (
              <p className="text-custom-red-2 text-sm mb-[14px] ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`bg-custom-gray-2 py-4 px-5 w-full rounded-xl focus:outline-none placeholder:text-gray-500 ${
                errors.email
                  ? "border border-custom-red-2 mb-[2px]"
                  : "mb-[16px]"
              }`}
            />
            {errors.email && (
              <p className="text-custom-red-2 text-sm mb-[14px] ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "At least 4 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Cannot exceed 15 characters",
                },
                validate: (value) =>
                  !reservedUsernames.includes(value.toLowerCase()) ||
                  "This username is reserved. Please choose another one.",
              })}
              className={`bg-custom-gray-2 py-4 px-5 w-full rounded-xl focus:outline-none placeholder:text-gray-500 ${
                errors.username
                  ? "border border-custom-red-2 mb-[2px]"
                  : "mb-[16px]"
              }`}
            />
            {errors.username && (
              <p className="text-custom-red-2 text-sm mb-[14px] ml-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
                maxLength: {
                  value: 128,
                  message: "Cannot exceed 128 characters",
                },
              })}
              className={`bg-custom-gray-2 py-4 px-5 w-full rounded-xl focus:outline-none placeholder:text-gray-500 ${
                errors.password
                  ? "border border-custom-red-2 mb-[2px]"
                  : "mb-[16px]"
              }`}
            />
            {errors.password && (
              <p className="text-custom-red-2 text-sm mb-[14px] ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-custom-black-2 hover:bg-custom-black-1 text-custom-white font-bold h-[56px] flex items-center justify-center rounded-xl focus:outline-none w-full"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center w-5 h-5">
                <Spinner />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center mt-[14px] text-custom-black-2">
            <span className="text-[0.95rem] font-medium">
              Already have an account?
              <Link
                to="/login"
                className="text-custom-blue-3 hover:underline hover:text-custom-blue-4 ml-1"
              >
                Log In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
