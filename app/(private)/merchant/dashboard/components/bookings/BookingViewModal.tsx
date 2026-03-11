"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useGetSingleBookingQuery } from "@/redux/features/userDashboard/userDashboard";

export function BookingDetailsModal({
    bookingId,
    open,
    onOpenChange,
}: {
    bookingId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { data, isLoading } = useGetSingleBookingQuery(bookingId, {
        skip: !bookingId,
    });

    const booking = data?.data;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-2xl p-0 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <DialogHeader className="px-6 py-4 ">
                    <DialogTitle className="text-lg text-start font-semibold text-blue-600">
                        Booking Details
                    </DialogTitle>
                    
                </DialogHeader>

                <div className="px-6 py-6 space-y-6">
                    {isLoading && <div className="text-center py-10">Loading...</div>}

                    {!isLoading && booking && (
                        <>
                            {/* Status Banner */}
                            <div className="flex items-start gap-3 rounded-xl border border-emerald-400 bg-emerald-50 px-4 py-4">
                                <CheckCircle2 className="h-6 w-6 mt-0.5 text-emerald-600" />
                                <div>
                                    <p className="text-sm font-semibold text-emerald-700">
                                        {booking.booking.status}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Booking details for {booking.customer.name}
                                    </p>
                                </div>
                            </div>

                            {/* Booking Info */}
                            <div className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 space-y-3 shadow-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Booking ID:</span>
                                    <span className="text-gray-900">{booking.booking.booking_id}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Customer Name:</span>
                                    <span className="text-gray-900">{booking.customer.name}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Email:</span>
                                    <span className="text-gray-900">{booking.customer.email}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Phone:</span>
                                    <span className="text-gray-900">{booking.customer.phone}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Service:</span>
                                    <span className="text-gray-900">{booking.booking.service}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Date & Time:</span>
                                    <span className="text-gray-900">{booking.booking.date_time}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Duration:</span>
                                    <span className="text-gray-900">{booking.booking.duration}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Staff:</span>
                                    <span className="text-gray-900">{booking.booking.staff}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">Price:</span>
                                    <span className="text-gray-900">{booking.booking.price} SAR</span>
                                </div>
                            </div>
                            <DialogClose asChild>
                                <div className=" flex justify-center items-center">
                                    <Button variant="outline" className="h-9 w-24">
                                        Close
                                    </Button>
                               </div>
                            </DialogClose>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}