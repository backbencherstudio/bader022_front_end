import { Bell, User } from "lucide-react";

export default function TopBar() {
  return (
    <header
      className="h-17.5 w-full fixed a z-20 border-b border-r border-[#E9E9E9] bg-white/10 backdrop-blur-md
                 flex justify-end px-8"
    >
      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button
          className="p-3 rounded-full hover:bg-white/10 transition"
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
        </button>

        {/* Profile Icon */}
        <button
          className="p-3 rounded-full hover:bg-white/10 transition"
          aria-label="Profile"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
