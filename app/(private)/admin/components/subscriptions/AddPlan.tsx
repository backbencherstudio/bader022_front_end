"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubcriptionPostMutation } from "@/redux/features/admin/adminApi";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AddPlan() {
    const [open, setOpen] = useState(false);
    const [features, setFeatures] = useState([""]);
    const [planName, setPlanName] = useState("");
    const [packageType, setPackageType] = useState("");

    const [SubcriptionPost, { isLoading }] = useSubcriptionPostMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;

        // Validation for selects
        if (!planName || !packageType) {
            toast.error("Please select plan name and package type!");
            return;
        }

        const body = {
            name: planName,
            price: Number(form.price.value),
            title: form.title.value,
            currency: form.currency.value,
            package: packageType,
            features: features.filter((f) => f.trim() !== ""),
            status: Number(form.status.value),
        };

        try {
            await SubcriptionPost(body).unwrap();
            form.reset();
            setFeatures([""]);
            setPlanName("");
            setPackageType("");
            setOpen(false);
            toast.success("Subscription plan added successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to add plan.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer">Add Plan</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md max-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add Subscription Plan</DialogTitle>
                    </DialogHeader>

                    {/* Plan Name */}
                    <div>
                        <Label>Name</Label>
                        <Select value={planName} onValueChange={setPlanName}>
                            <SelectTrigger className="mt-2 w-full h-12">
                                <SelectValue placeholder="Select Plan Name" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Basic">Basic</SelectItem>
                                <SelectItem value="Premium">Premium</SelectItem>
                                <SelectItem value="Enterprise">Enterprise</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price */}
                    <div>
                        <Label>Price</Label>
                        <Input name="price" className="mt-2" type="number" required />
                    </div>

                    {/* Currency */}
                    <div>
                        <Label>Currency</Label>
                        <Input name="currency" className="mt-2" defaultValue="SAR" required />
                    </div>

                    {/* Package */}
                    <div>
                        <Label>Package</Label>
                        <Select value={packageType} onValueChange={setPackageType}>
                            <SelectTrigger className="mt-2 w-full h-12">
                                <SelectValue placeholder="Select Package Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Free">Free</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Annual">Annual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Description */}
                    {/* <div>
                        <Label>Description</Label>
                        <Textarea name="title" className="mt-2" required />
                    </div> */}

                    {/* Features */}
                    <div>
                        <Label>Features</Label>
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
                    <div>
                        <Label>Status</Label>
                        <select
                            name="status"
                            className="w-full border rounded-md px-3 py-2 mt-2"
                            defaultValue="1"
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Plan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}