import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface DashboardPopupProps {
  isPopup: boolean;
  setIsPopup: (value: boolean) => void;
}

export function BookingPopup({ isPopup, setIsPopup }: DashboardPopupProps) {
  useEffect(() => {
    if (!isPopup) return;

    const timer = setTimeout(() => {
      setIsPopup(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isPopup, setIsPopup]);

  return (
    <Dialog open={isPopup} onOpenChange={setIsPopup}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <DialogTitle className="text-lg">You&apos;re all set!</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Your booking page is live and ready to accept appointments.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm" onClick={() => setIsPopup(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
