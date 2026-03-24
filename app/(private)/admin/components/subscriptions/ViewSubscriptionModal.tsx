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
    // console.log(data,{id})

    return (
        <Dialog>
            {/* Trigger */}
            <DialogTrigger asChild>
                <button className="h-10 cursor-pointer w-10 text-muted-foreground hover:text-black rounded-xl border hover:bg-white flex items-center justify-center">
                    <Eye className="h-5 w-5" />
                </button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-lg   rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-3 shadow-sm text-black">
                <DialogHeader>
                    <DialogTitle className="text-xl py-2 border border-emerald-400 bg-emerald-50 rounded-lg mt-6 px-2">Subscription Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-6 text-center">Loading...</div>
                ) : (
                        <div className="space-y-3  text-gray-700 ">
                        <p className="flex justify-between"><strong>Business:</strong> {data?.data?.user?.name}</p>
                        <p className="flex justify-between"><strong>Email:</strong> {data?.data?.user?.email}</p>
                        <p className="flex justify-between"><strong>Plan:</strong> {data?.data?.plan?.name}</p>
                        <p className="flex justify-between"><strong>Price:</strong> {data?.data?.plan?.price}</p>
                        <p className="flex justify-between"><strong>Status:</strong> {data?.data?.status}</p>
                        <p className="flex justify-between"><strong>Start:</strong> {data?.data?.starts_at}</p>
                        <p className="flex justify-between"><strong>End:</strong> {data?.data?.ends_at}</p>

                        <DialogClose asChild>
                            <Button variant="outline" className="w-full text-blue-400 mt-5">
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}