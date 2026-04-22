"use client";

import { useLoginVerifyMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "./Modal";

export default function EmailVerificationModal({
  isOpen,
  onClose,
  email,
  onVerified,
}: any) {
  const [loginVerify, { isLoading }] = useLoginVerifyMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleVerify = async (otp: string) => {
    try {
      const response = await loginVerify({ email, otp }).unwrap();
      dispatch(setCredentials({ ...response }));
      toast.success("Verification Successful");
      onVerified(); // Signals parent to close everything
      router.replace("/user/dashboard"); // Redirect
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <h2 className="text-xl font-semibold text-center mb-4">Verify Email</h2>
        {/* Pass your OTP input logic here and call handleVerify on submit */}
      </div>
    </Modal>
  );
}
