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
import { useGetPackageIdQuery } from "@/redux/features/admin/adminApi";

export function ViewPackage({ id }: { id: number }) {
    const { data, isLoading } = useGetPackageIdQuery(id);


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
                        <p><strong>Package Name:</strong> {data?.data?.name}</p>
                            <p><strong>Buesness type:</strong> {data?.data?.package}</p>
                        <p><strong>Duration:</strong> {data?.data?.day}</p>
                        <p><strong>Price:</strong> {data?.data?.price}</p>
                        {/* <p><strong>Status:</strong> {data?.data?.status}</p> */}
                            <p><strong>Start:</strong> {data?.data?.created_at}</p>
                            <p><strong>End:</strong> {data?.data?.updated_at}</p>

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