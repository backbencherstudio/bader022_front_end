import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"; // ShadCN button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card component
import {
  Info,
  HelpCircle,
  MessageCircle,
  NotebookText,
  Lock,
} from "lucide-react"; // Import Lucide icons
import Link from "next/link"; // For document links

type FormData = {
  helpCenterVisited: boolean;
  contactSupportOpened: boolean;
};

export default function SupportSettings() {
  const { handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="container max-w-3xl p-4 mx-auto">
      <div className="border rounded-xl p-5">
        <h2 className="text-2xl font-semibold mb-6 text-black">
          Support Settings
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Help Center Section */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Card className="w-full">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-blue-500" />
                  <CardTitle>Help Center</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Browse articles and guides
                </p>
                <Link href="/help-center">
                  <Button
                    variant="default"
                    className="px-6 py-2 mt-4 cursor-pointer"
                  >
                    Visit Help Center
                  </Button>
                </Link>
              </CardContent>
            </Card>
            {/* Contact Support Section */}
            <Card className="w-full">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                  <CardTitle>Contact Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get in touch with our support team
                </p>
                <Link href="/contact-support">
                  <Button
                    variant="default"
                    className="px-6 py-2 mt-4 cursor-pointer"
                  >
                    Open Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Legal Information Section */}

          <div className="flex items-center gap-2">
            <CardTitle>Legal</CardTitle>
          </div>
          <div className="flex justify-between items-center border p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <NotebookText size={20} />
              <p>Terms & Conditions</p>
            </div>
            <Link href="/terms-conditions" className="text-sm underline">
              View Document
            </Link>
          </div>
          <div className="flex justify-between items-center border p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Lock size={20} />
              <p>Privacy Policy</p>
            </div>
            <Link href="/terms-conditions" className="text-sm underline">
              View Document
            </Link>
          </div>

          {/* System Information Section */}
          <CardTitle>System Information</CardTitle>
          <Card className="bg-[#e9e9ea]">
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Info className="h-6 w-6 text-gray-500" />
                  <p className="font-medium">Platform Version</p>
                </div>
                <p className="text-sm text-gray-800">v2.5.0</p>
              </div>
              <hr className="my-4 h-0.5 bg-gray-300" />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Last Updated</p>
                  <p>December 15, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes Button */}
        </form>
      </div>
      <div>
        <Button type="submit" className="flex ml-auto cursor-pointer my-4">
          Save Change
        </Button>
      </div>
    </div>
  );
}
