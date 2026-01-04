// import { useForm, Controller } from "react-hook-form";
// import { Switch } from "@/components/ui/switch"; // Assuming you have ShadCN's Switch component
// import { Button } from "@/components/ui/button";

// type FormData = {
//   emailNotifications: boolean;
//   bookingAlerts: boolean;
//   paymentAlerts: boolean;
//   systemAnnouncements: boolean;
// };

// export default function NotificationSettings() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       emailNotifications: true,
//       bookingAlerts: true,
//       paymentAlerts: false,
//       systemAnnouncements: true,
//     },
//   });

//   const onSubmit = (data: FormData) => {
//     console.log("Notification Settings:", data);
//   };

//   return (
//     <div className="container max-w-lg mx-auto p-5">
//       <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Email Notifications */}
//         <div className="flex items-center justify-between">
//           <div>
//             <label className="text-sm font-medium text-muted-foreground">
//               Email Notifications
//             </label>
//             <p className="text-xs text-muted-foreground">
//               Receive notifications via email
//             </p>
//           </div>
//           <Controller
//             name="emailNotifications"
//             control={control}
//             render={({ field }) => (
//               <Switch checked={field.value} onCheckedChange={field.onChange} />
//             )}
//           />
//         </div>

//         {/* Booking Alerts */}
//         <div className="flex items-center justify-between">
//           <div>
//             <label className="text-sm font-medium text-muted-foreground">
//               Booking Alerts
//             </label>
//             <p className="text-xs text-muted-foreground">
//               Get notified when new bookings are made
//             </p>
//           </div>
//           <Controller
//             name="bookingAlerts"
//             control={control}
//             render={({ field }) => (
//               <Switch onCheckedChange={field.onChange} checked={field.value} />
//             )}
//           />
//         </div>

//         {/* Payment Alerts */}
//         <div className="flex items-center justify-between">
//           <div>
//             <label className="text-sm font-medium text-muted-foreground">
//               Payment Alerts
//             </label>
//             <p className="text-xs text-muted-foreground">
//               Get notified about payment activities
//             </p>
//           </div>
//           <Controller
//             name="paymentAlerts"
//             control={control}
//             render={({ field }) => (
//               <Switch onCheckedChange={field.onChange} checked={field.value} />
//             )}
//           />
//         </div>

//         {/* System Announcements */}
//         <div className="flex items-center justify-between">
//           <div>
//             <label className="text-sm font-medium text-muted-foreground">
//               System Announcements
//             </label>
//             <p className="text-xs text-muted-foreground">
//               Receive updates about platform features and changes
//             </p>
//           </div>
//           <Controller
//             name="systemAnnouncements"
//             control={control}
//             render={({ field }) => (
//               <Switch onCheckedChange={field.onChange} checked={field.value} />
//             )}
//           />
//         </div>

//         {/* Save Button */}
//         <div>
//           <Button type="submit" className="w-full bg-blue-600 text-white">
//             Save Changes
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Bell, CreditCard, Mail, MessageCircle } from "lucide-react"; // Import icons
import { FaEnvelope } from "react-icons/fa6";

type FormData = {
  emailNotifications: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  systemAnnouncements: boolean;
};

export default function NotificationSettings() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      emailNotifications: true,
      bookingAlerts: true,
      paymentAlerts: false,
      systemAnnouncements: true,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Notification Settings:", data);
  };

  return (
    <div className="container max-w-3xl mx-auto mb-4 p-4">
      <div className=" p-5 border rounded-xl mb-4">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Notification Settings
        </h2>
        <form
          id="notifications"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <Mail size={22} className="mr-3 mt-1 text-gray-500" />{" "}
              {/* Email Icon */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">
                  Email Notifications
                </label>
                <p className="text-xs text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Controller
              name="emailNotifications"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Booking Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <Bell className="mr-2 mt-1 text-gray-500" />{" "}
              {/* Booking Alerts Icon */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">
                  Booking Alerts
                </label>
                <p className="text-xs text-muted-foreground">
                  Get notified when new bookings are made
                </p>
              </div>
            </div>
            <Controller
              name="bookingAlerts"
              control={control}
              render={({ field }) => (
                <Switch
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
          </div>

          {/* Payment Alerts */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <CreditCard className="mr-2 mt-1 text-gray-500" />{" "}
              {/* Payment Alerts Icon */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">
                  Payment Alerts
                </label>
                <p className="text-xs text-muted-foreground">
                  Get notified about payment activities
                </p>
              </div>
            </div>
            <Controller
              name="paymentAlerts"
              control={control}
              render={({ field }) => (
                <Switch
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
          </div>

          {/* System Announcements */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <MessageCircle className="mr-2 mt-1 text-gray-500" />{" "}
              {/* System Announcements Icon */}
              <div>
                <label className="text-sm font-medium text-black dark:text-white">
                  System Announcements
                </label>
                <p className="text-xs text-muted-foreground">
                  Receive updates about platform features and changes
                </p>
              </div>
            </div>
            <Controller
              name="systemAnnouncements"
              control={control}
              render={({ field }) => (
                <Switch
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              )}
            />
          </div>

          {/* Save Button */}
        </form>
      </div>
      <div>
        <Button type="submit" id="notifications" className="flex ml-auto">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
