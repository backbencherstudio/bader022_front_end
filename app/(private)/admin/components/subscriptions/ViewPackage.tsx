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
    console.log(data,"errrrrrrrr")

    return (
        <Dialog>
            {/* Trigger */}
            <DialogTrigger asChild>
                <button className="h-10 w-10 cursor-pointer text-gray-500 hover:text-black rounded-xl border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
                    <Eye className="h-5 w-5 " />
                </button>
            </DialogTrigger>

            {/* Content */}
            <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-black ">
                        Subscription Details
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-10 text-center text-gray-400 font-medium">
                        Loading...
                    </div>
                ) : (
                    <div className=" py-6 space-y-6">
                        {/* Status Banner */}
                        <div className="flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4">
                            <Eye className="h-6 w-6 mt-0.5 text-emerald-600" />
                            <div>
                                <p className="text-sm font-semibold text-emerald-700">
                                        {data?.data?.status} Package
                                </p>
                                <p className="text-sm text-gray-700">
                                    Details for {data?.data?.name} plan
                                </p>
                            </div>
                        </div>

                        {/* Package Details Card */}
                        <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-3 shadow-sm">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Package Name:</span>
                                <span className="text-gray-900">{data?.data?.name}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Business Type:</span>
                                <span className="text-gray-900">{data?.data?.package}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Duration:</span>
                                <span className="text-gray-900">{data?.data?.day} days</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Price:</span>
                                <span className="text-gray-900">{data?.data?.price} SAR</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">Start:</span>
                                <span className="text-gray-900">{data?.data?.created_at}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-700">End:</span>
                                <span className="text-gray-900">{data?.data?.updated_at}</span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <DialogClose asChild>
                            <Button className="w-full rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100">
                                Close
                            </Button>
                        </DialogClose>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}