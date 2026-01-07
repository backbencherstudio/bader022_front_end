"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";

type FormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const { register, handleSubmit } = useForm<FormValues>();

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
          Login to Bokli
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
          Your all-in-one booking management platform
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            icon={<FaEnvelope />}
            placeholder="john@example.com"
            type="email"
            register={register("email", { required: true })}
          />
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black dark:bg-blue-600 text-white py-3 rounded-md font-medium hover:opacity-90"
          >
            Send OTP
          </button>
        </form>
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
