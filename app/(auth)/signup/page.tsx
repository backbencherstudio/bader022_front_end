"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  category: string;
  remember: boolean;
};

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600">B</span>Bokli
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
          Sign Up to Bokli
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Your all-in-one booking management platform
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            icon={<FaUser />}
            placeholder="John Doe"
            register={register("fullName", { required: true })}
          />

          <Input
            label="Email Address"
            icon={<FaEnvelope />}
            placeholder="john@example.com"
            type="email"
            register={register("email", { required: true })}
          />

          <Input
            label="Phone"
            icon={<FaPhoneAlt />}
            placeholder="+1 (555) 000-0000"
            register={register("phone", { required: true })}
          />

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
                {...register("password", { required: true })}
                className="w-full pl-10 pr-10 py-3 border rounded-md
                    bg-white dark:bg-gray-700
                    border-gray-300 dark:border-gray-600
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Business Category *
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-3 border rounded-md
                  bg-white dark:bg-gray-700
                  border-gray-300 dark:border-gray-600
                  text-gray-700 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              <option>Beauty & Spa</option>
              <option>Fitness</option>
              <option>Consulting</option>
              <option>Healthcare</option>
            </select>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>
            <button type="button" className="text-blue-600 hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-600 cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ------------------ */
/* Reusable Input    */
/* ------------------ */
function Input({
  label,
  icon,
  register,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  register: any;
  placeholder: string;
  type?: string;
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
          className="w-full pl-10 py-3 border rounded-md
              bg-white dark:bg-gray-700
              border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
