import { Bell, Menu, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { truncateAddress } from "../../utils/helpers";
import ConnectWalletButton from "./ui/connect-wallet-button";

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

const Header = ({ onMenuClick }) => {
  const { address } = useWallet();
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const navigate = useNavigate();
  const Options = [
    "grammar",
    "vocabulary",
    "speaking",
    "listening",
    "reading",
    "games",
  ];
  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(page);
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => ({ ...n, isRead: true }))
    );
  };
  const handleChange = (e) => {
    setShowFiltered(true);
    const query = e.target.value.toLowerCase();
    setSearchQuery(e.target.value);
    const filteredOptionsinArray = Options.filter((eachOption) =>
      eachOption.includes(query)
    ); //if the filtered content includes it will return in an array or else empty array will be returned
    setFilteredOptions(filteredOptionsinArray);
  };
  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6">
      <div className="flex items-center justify-between h-full">
        {/* Menu Button */}
        <button
          className="p-2 text-gray-100 bg-blue-900  hover:text-blue-600 rounded-lg mr-4 hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search Input */}
        <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => handleChange(e)}
          />
          {showFiltered && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md cursor-pointer z-10">
              {searchQuery.length > 0 ? (
                filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      className="px-4 py-2 text-gray-500 hover:bg-gray-100"
                      key={index}
                      onClick={() => {
                        setSearchQuery(option);
                        navigate(`/${option}`);
                        setShowFiltered(false);
                      }}
                    >
                      {option}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No Search Result
                  </div>
                )
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 relative">
          {address && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Connected as:</span>
              <span className="font-medium">{truncateAddress(address)}</span>
            </div>
          )}

          <div
            className="relative"
            onMouseEnter={() => setActiveTooltip("notifications")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <button
              className="relative p-2 text-gray-400 bg-blue-900 hover:text-blue-600 rounded-full hover:bg-gray-100  border-none "
              onClick={() => setIsOpen(!isOpen)}
            >
              <Bell className="h-6 w-6 text-gray-200 hover:text-blue-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
              )}
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-md z-50">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <span className="font-semibold">Notifications</span>
                  <button
                    className="text-gray-200 bg-blue-900 text-sm"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </button>
                </div>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-2 text-black ${
                        notification.isRead ? "opacity-50" : "font-bold"
                      }`}
                      onClick={() => navigate("/notifications")}
                    >
                      <p>{notification.title}</p>
                      <span className="text-xs text-gray-500">
                        {notification.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setActiveTooltip("settings")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <button
              onClick={() => handleNavClick("settings")}
              className="flex bg-blue-900 items-center gap-2 px-3 py-2 text-left rounded-lg transition-colors hover:bg-gray-50"
            >
              <Settings className="w-5 h-5 text-gray-200 hover:text-blue-600" />
            </button>
            {activeTooltip === "settings" && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs px-2 py-2 rounded-md">
                Settings
              </div>
            )}
          </div>

          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
