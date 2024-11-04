import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/common/Spinner";

export type LoginFormData = {
  usernameOrEmail: string;
  password: string;
};

type ErrorResponse = {
  message: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (formData: LoginFormData) => {
      const { data } = await axios.post("/api/auth/login", formData);
      return data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
      toast({ title: "Logged in successfully." });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Login failed.",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="p-4 w-full max-w-[400px] rounded-3xl">
        <h2 className="text-2xl font-bold text-center text-custom-black-2 mb-[17px]">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Username or email"
              autoComplete="off"
              {...register("usernameOrEmail", {
                required: "Username or email is required",
              })}
              className={`bg-custom-gray-2 py-4 px-5 w-full rounded-xl focus:outline-none placeholder:text-gray-500 ${
                errors.usernameOrEmail
                  ? "border border-custom-red-2 mb-[2px]"
                  : "mb-[16px]"
              }`}
            />
            {errors.usernameOrEmail && (
              <p className="text-custom-red-2 text-sm mb-[14px] ml-1">
                {errors.usernameOrEmail.message}
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
              "Login"
            )}
          </button>

          <div className="text-center mt-[14px] text-custom-black-2">
            <span className="text-[0.95rem] font-medium">
              Don't have an account yet?
              <Link
                to="/signup"
                className="text-custom-blue-3 hover:underline hover:text-custom-blue-4 ml-1"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
