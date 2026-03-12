import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCancelAppoitmentQuery, useConfirmCancelAppointmentMutation } from "@/redux/features/userDashboard/userDashboard";
import { toast } from "sonner";

export function CancelAppointmentModal({
  bookingID,
  onClose,          
  onCancelSuccess,  
}: {
  bookingID: number;
  onClose: () => void;
  onCancelSuccess: () => void;
}) {
  const { data } = useCancelAppoitmentQuery({ booking_id: bookingID });
  const booking = data?.data;

  const [confirmCancel, { isLoading: cancelLoading }] = useConfirmCancelAppointmentMutation();

  const handleConfirmCancel = async () => {
    try {
      await confirmCancel({ booking_id: bookingID }).unwrap();
      onClose();           
      onCancelSuccess();   
    } catch (err) {
      console.error("Cancel failed", err);
    }
    toast.success("Appointment cancelled successfully");
  };

  return (
    <DialogContent className="p-0 overflow-auto rounded-2xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
      <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-border">
        <DialogTitle className="text-base font-semibold">
          Cancel Appointment?
        </DialogTitle>
      </DialogHeader>

      <div className="px-6 space-y-5">
        <div className="text-sm leading-6">
          <p>Are you sure you want to cancel this booking?</p>
          <p>This action cannot be undone.</p>
        </div>

        <div className="rounded-xl border border-border px-6 py-5 space-y-3 text-sm ">
          <div className="flex items-center gap-2">
            <p>Service:</p>
            <p className="font-medium">{booking?.service_name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>Date:</p>
            <p className="font-medium">{booking?.booking_date}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>Time:</p>
            <p className="font-medium">{booking?.booking_time}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#FACC15] bg-[#FFFBEB] px-6 py-4 text-sm text-[#92400E]">
          <span className="font-semibold">Note:</span> {booking?.note}
        </div>

        <div className="flex items-center flex-wrap gap-4 p-4">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer py-5">
              Keep Booking
            </Button>
          </DialogClose>

          <Button onClick={handleConfirmCancel} className="cursor-pointer py-5">
            {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}