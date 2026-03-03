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

export function AddPlan() {
    const [open, setOpen] = useState(false);
    const [features, setFeatures] = useState([""]);
    const [SubcriptionPost, { isLoading }] =
        useSubcriptionPostMutation();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const form = e.target;

        const body = {
            name: form.name.value,
            price: Number(form.price.value),
            title: form.title.value,
            currency: form.currency.value,
            package: form.package.value,
            features: features.filter((f) => f !== ""),
            status: Number(form.status.value),
        };

        try {
            await SubcriptionPost(body).unwrap();
            form.reset();
            setFeatures([""]);
          setOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="overflow-y-auto">
                <Button>Add Plan</Button>
            </DialogTrigger>

            <DialogContent className="max-w-md overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add Subscription Plan</DialogTitle>
                    </DialogHeader>

                    <div>
                        <Label>Name</Label>
                        <Input name="name" className="mt-2" required />
                    </div>

                    <div>
                        <Label>Price</Label>
                        <Input name="price" className="mt-2"  type="number" required />
                    </div>

                    <div>
                        <Label>Currency</Label>
                        <Input name="currency" className="mt-2" defaultValue="SAR" required />
                    </div>

                    <div>
                        <Label>Package</Label>
                        <Input name="package"
                            className="mt-2" placeholder="Monthly / Free" required />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea name="title" className="mt-2" required />
                    </div>

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