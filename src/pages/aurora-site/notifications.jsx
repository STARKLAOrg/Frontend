import ClearAllModal from "@/components/layout/ui/clear-all-modal";
import { X } from "lucide-react";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    title: "New Course Available",
    message: "Introduction to Web3 Development is now available",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "2",
    title: "Assignment Due",
    message: "Your Blockchain Basics assignment is due tomorrow",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "3",
    title: "Achievement Unlocked",
    message: "You completed Smart Contract Security module",
    timestamp: "3 days ago",
    isRead: false,
  },
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const deleteSingleNotification = (id)=>{
    setNotifications(notification => notification.filter(data => data.id !==id))
  }

  const clearAllNotification = ()=>{
    setNotifications([]) 
  }
  return (
    <div className="w-full h-screen p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded ${
            filter === "unread" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 rounded ${
            filter === "read" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Read
        </button>
        <ClearAllModal filter={filter} onClearAll={clearAllNotification} />
      </div>
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{notification.title}</p>
                <p className="text-gray-600 text-sm">{notification.message}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {notification.timestamp}
                </p>
              </div>
              <X
                className="text-[#6b7280] hover:text-[#ef4444]"
                onClick={() => deleteSingleNotification(notification.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
