"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Edit, Pencil } from "lucide-react";
import { useUpdatePlanByIdMutation } from "@/redux/features/admin/adminApi";
import { toast } from "sonner";

type FormValues = {
    name: string;
    title: string;
    price: number;
    currency: string;
    package: string;
    packageStatus: "active" | "inactive";
};

export function PackagePlanUpdateModal({
    id,
    plan,
}: {
    id: number;
    plan: any;
}) {
    const [open, setOpen] = useState(false);
        const [features, setFeatures] = useState([""]);
    

    const [updateSubscription, { isLoading }] =
        useUpdatePlanByIdMutation();

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            title: "",
            price: 0,
            currency: "SAR",
            package: "Free",
            packageStatus: "active",
        },
    });

    useEffect(() => {
        if (plan) {
            form.reset({
                name: plan.name || "",
                title: plan.title || "",
                price: Number(plan.price) || 0,
                currency: plan.currency || "SAR",
                package: plan.package || "Free",
                packageStatus: plan.status ? "active" : "inactive",
            });
        }
    }, [plan, form]);

    async function onSubmit(values: FormValues) {
        try {
            const payload = {
                name: values.name,
                title: values.title,
                price: Number(values.price),
                currency: values.currency,
                package: values.package,
                features: plan?.features || [],
                status: values.packageStatus === "active" ? 1 : 0,
                _method: "put",
            };

            await updateSubscription({
                id,
                data: payload,
            }).unwrap();

            toast.success("Subscription updated successfully!");
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Update failed!");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                   
                    className="h-10 w-10 rounded-xl text-muted-foreground hover:text-black border hover:bg-white flex items-center justify-center cursor-pointer"
                >
                    <Pencil className="h-5 w-5" />
                </button>
            </DialogTrigger>

            <DialogContent className="rounded-xl max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Subscription Plan</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan Name</FormLabel>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Plan" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="Basic">Basic</SelectItem>
                                            <SelectItem value="Premium">Premium</SelectItem>
                                            <SelectItem value="Enterprise">Enterprise</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {/* Title */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Price */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(Number(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Currency */}
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Package */}
                        <FormField
                            control={form.control}
                            name="package"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Package Type</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select package" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="Free">Free</SelectItem>
                                            <SelectItem value="Monthly">Monthly</SelectItem>
                                            <SelectItem value="Annual">Annual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <div>
                            {features.map((item, index) => (
                                <Input
                                    key={index}
                                    className="mt-2"
                                    placeholder="Enter feature"
                                    value={item}
                                    onChange={(e) => {
                                        const updated = [...features];
                                        updated[index] = e.target.value;
                                        setFeatures(updated);
                                    }}
                                />
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() => setFeatures([...features, ""])}
                            >
                                + Add Feature
                            </Button>
                        </div>


                        {/* Status */}
                        <FormField
                            control={form.control}
                            name="packageStatus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="status" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Save Changes"}
                            </Button>

                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}