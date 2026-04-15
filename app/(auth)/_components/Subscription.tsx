"use client";

import { authorize } from "@/lib/auth";
import {
  useGetSubscriptionPlanQuery,
  useSubscriptionMutation,
} from "@/redux/features/merchant/SubscriptionPlanApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";

type FormValues = {
  email: string;
  planId: number;
};

export default function Subscription() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const [subscription, { isLoading }] = useSubscriptionMutation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const { data: allSubscriptionPlan, isLoading: isPlanLoading } =
    useGetSubscriptionPlanQuery({});

  const plans = allSubscriptionPlan?.data || [];

  const selectedPlanId = watch("planId");

  useEffect(() => {
    const plan = plans.find((p: any) => p.id === Number(selectedPlanId));
    setSelectedPlan(plan);
  }, [selectedPlanId, plans]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await subscription({
        email: data.email,
        plan_id: Number(data.planId),
      }).unwrap();
      // console.log(response);
      if (response?.success) {
        if (response?.tap_payment_url) {
          router.push(response.tap_payment_url);
        } else {
          toast.success("Subscription successful");
        }
      }
    } catch (error: any) {
      // console.log(error);
      const message = error?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <Link href={"/"}>
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
        </Link>

        <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white py-4">
          Subscription to Bokli
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder=""
                {...register("email", {
                  required: "Email is required",
                })}
                className="w-full pl-10 py-3 border rounded-md"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* PLAN DROPDOWN */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Plan *
            </label>

            <select
              {...register("planId", { required: "Plan is required" })}
              className="w-full p-3 border rounded-md"
            >
              <option className="bg-white dark:bg-gray-800" value="">
                Choose Plan
              </option>
              {plans.map((plan: any) => (
                <option
                  className="bg-white dark:bg-gray-800"
                  key={plan.id}
                  value={plan.id}
                >
                  {plan.name} ({plan.package}-{plan?.price})
                </option>
              ))}
            </select>

            {errors.planId && (
              <span className="text-red-500 text-sm">
                {errors.planId.message}
              </span>
            )}
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-md cursor-pointer"
          >
            {isLoading ? "Loading..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
