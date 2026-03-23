"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import Image from "next/image";

import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { authorize } from "@/lib/auth";
import { toast } from "sonner";
// import { toast } from "sonner";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  category: string;
  remember: boolean;
};

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [registerUser, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    const auth = authorize(["Merchant", "Admin", "User"]);
    if (auth.authorized) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await registerUser({
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password,
      }).unwrap();

      if (response.success) {
        dispatch(
          setCredentials({
            token: response.token,
            user: {
              ...response.data,
              role: "user",
            },
          }),
        );

        router.push("/login");
      }
    } catch (error: any) {
      console.error(error);
      error(error?.data?.message || "Registration failed. Please try again.");
    }
    toast.error("Registration failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <div className="flex justify-center">
          <Image
            src="/images/image 259.png"
            alt="Company Logo"
            width={120}
            height={40}
            priority
            className="h-auto w-auto object-contain dark:brightness-0 dark:invert"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          Sign Up to Bokli
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            icon={<FaUser />}
            placeholder="John Doe"
            register={register("fullName", {
              required: "Full name is required",
             
            })}
            error={errors.fullName?.message}
          />
          {/* {
            errors.fullName && <span className="text-red-500 text-sm">Name is required</span>
          } */}

          <Input
            label="Email Address"
            icon={<FaEnvelope />}
            placeholder="john@example.com"
            type="email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={errors.email?.message}

          />
          {/* {
            errors.email && <span className="text-red-500 text-sm">Email is required</span>
          } */}

          <Input
            label="Phone"
            icon={<FaPhoneAlt />}
            placeholder="966..."
            register={register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone must be at least 10 digits",
              },
            })}
            error={errors.phone?.message}

          />
          {/* {
            errors.phone && <span className="text-red-500 text-sm">Phone is required</span>
          } */}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Password *
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full pl-10 pr-10 py-3 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {
            errors.password && <span className="text-red-500 text-sm">Password is required</span>
          }

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90 cursor-pointer mt-3"
          >
            {isLoading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 cursor-pointer hover:underline ">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({
  label,
  icon,
  register,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  icon: React.ReactNode;
  register: any;
  placeholder: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label} *
      </label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={`w-full pl-10 py-3 border rounded-md bg-white dark:bg-gray-700 
          ${error ? "border-red-500" : "border-gray-300"} 
          text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}