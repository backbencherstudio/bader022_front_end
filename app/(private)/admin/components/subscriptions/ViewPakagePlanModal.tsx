"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useGetSubscriptionsIdQuery } from "@/redux/features/admin/adminApi";

export function ViewSubscriptionModal({ id }: { id: string }) {
    const { data, isLoading } = useGetSubscriptionsIdQuery(id);
    console.log(data,{id})

    return (
        <Dialog>
            {/* Trigger */}
            <DialogTrigger asChild>
                <button className="h-10 w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center">
                    <Eye className="h-5 w-5" />
                </button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Subscription Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-6 text-center">Loading...</div>
                ) : (
                    <div className="space-y-3">
                        <p><strong>Business:</strong> {data?.data?.user?.name}</p>
                        <p><strong>Email:</strong> {data?.data?.user?.email}</p>
                        <p><strong>Plan:</strong> {data?.data?.plan?.name}</p>
                        <p><strong>Price:</strong> {data?.data?.plan?.price}</p>
                        <p><strong>Status:</strong> {data?.data?.status}</p>
                        <p><strong>Start:</strong> {data?.data?.starts_at}</p>
                        <p><strong>End:</strong> {data?.data?.ends_at}</p>

                        <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}