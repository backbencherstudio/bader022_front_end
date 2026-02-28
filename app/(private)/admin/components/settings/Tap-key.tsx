"use client";

import React, { useEffect, useState } from "react";
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
    const { data, isLoading, isError, refetch } = useGetTapkeyQuery({});
    const [updateTapkey, { isLoading: isUpdating }] = useUpdateTapkeyMutation();

    const { register, handleSubmit, reset } = useForm<TapkeyFormData>({
        defaultValues: {
            tap_mode: "",
            tap_public_key: "",
            tap_secret_key: "",
        },
    });

    // Simple state for tap_mode select
    const [mode, setMode] = useState("");

    // Populate form when data arrives
    useEffect(() => {
        if (data?.data) {
            setMode(data.data.tap_mode || "");
            reset({
                tap_mode: data.data.tap_mode || "",
                tap_public_key: data.data.tap_public_key || "",
                tap_secret_key: data.data.tap_secret_key || "",
            });
        }
    }, [data, reset]);

    const onSubmit = async (formData: TapkeyFormData) => {
        try {
            await updateTapkey({ id: data?.data?.id, ...formData, tap_mode: mode }).unwrap();
            refetch();
           
        } catch (err) {
            console.error(err);
          
        }
    };
console.log(FormData,"dfdfdf")
    if (isLoading) return <div>Loading Tap key...</div>;
    if (isError) return <div className="text-red-500">Failed to load Tap key.</div>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tap Key Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Tap Mode */}
                <div>
                    <label className="block mb-1 font-medium">Mode</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    >
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