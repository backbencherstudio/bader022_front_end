"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetTapkeyQuery, useUpdateTapkeyMutation } from "@/redux/features/admin/adminApi";

type TapkeyFormData = {
    tap_mode: string;
    tap_public_key: string;
    tap_secret_key: string;
};

export default function Tapkey() {
    const { data, isLoading, isError } = useGetTapkeyQuery({});
    const [updateTapkey, { isLoading: isUpdating }] = useUpdateTapkeyMutation();

    const { register, handleSubmit, reset } = useForm<TapkeyFormData>({
        defaultValues: {
            tap_mode: "",
            tap_public_key: "",
            tap_secret_key: "",
        },
    });

    // Populate form when API data arrives
    useEffect(() => {
        if (data?.data) {
            reset({
                tap_mode: data.data.tap_mode || "",
                tap_public_key: data.data.tap_public_key || "",
                tap_secret_key: data.data.tap_secret_key || "",
            });
        }
    }, [data, reset]);

    const onSubmit = async (formData: TapkeyFormData) => {
        try {
            // Send only form data as body
            const result = await updateTapkey({ body: formData }).unwrap();

            // Reset form with API returned values
            reset({
                tap_mode: result.data.tap_mode,
                tap_public_key: result.data.tap_public_key,
                tap_secret_key: result.data.tap_secret_key,
            });

            console.log("Updated data:", result.data);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (isLoading) return <div>Loading Tap key...</div>;
    if (isError) return <div className="text-red-500">Failed to load Tap key.</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tap Key Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Tap Mode */}
                <div>
                    <label className="block mb-1 font-medium">Mode</label>
                    <select {...register("tap_mode", { required: true })} className="w-full border rounded px-3 py-2">
                        <option value="">Select mode</option>
                        <option value="test">test</option>
                        <option value="live">live</option>
                    </select>
                </div>

                {/* Public Key */}
                <div>
                    <label className="block mb-1 font-medium">Public Key</label>
                    <Input {...register("tap_public_key", { required: true })} />
                </div>

                {/* Secret Key */}
                <div>
                    <label className="block mb-1 font-medium">Secret Key</label>
                    <Input {...register("tap_secret_key", { required: true })} />
                </div>

                <div className="pt-4">
                    <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update Tap Key"}
                    </Button>
                </div>
            </form>
        </div>
    );
}