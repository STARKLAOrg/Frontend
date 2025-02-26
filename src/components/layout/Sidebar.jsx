import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  BookOpen,
  BarChart2,
  Users,
  Settings,
  MessageSquare,
  FileText,
  Headphones,
  MessageCircle,
  GraduationCap,
  Book,
  ChevronDown,
  ChevronRight,
  Gamepad,
  ShieldQuestion,
  Home
} from "lucide-react";
import Logo from "../../assets/S-icon-Photoroom.png";

const Sidebar = ({ isOpen, onClose, headerHeight }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [level, setLevel] = useState("Choose Your Level");
  const [isLearningExpanded, setIsLearningExpanded] = useState(false);

  const navigate = useNavigate();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const categories = [
    { icon: <Book className="w-5 h-5" />, label: "Grammar" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "Vocabulary" },
    { icon: <MessageCircle className="w-5 h-5" />, label: "Speaking" },
    { icon: <Headphones className="w-5 h-5" />, label: "Listening" },
    { icon: <FileText className="w-5 h-5" />, label: "Reading" },
    { icon: <Gamepad className="w-5 h-5" />, label: "Games" },
  ];

  const topNavItems = [
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Analytics",
      page: "analytics",
    },
    { icon: <Users className="w-5 h-5" />, label: "Community", page: "people" },
  ];

  return (
    <div
      className={`fixed left-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform bg-white dark:bg-gray-900 w-64 min-h-screen flex flex-col h-full shadow-lg border-r border-gray-200 dark:border-gray-700 pc-sidebar`}
      style={{ top: headerHeight }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex dark:bg-gray-300 w-fit mx-auto px-5 py-3 rounded-full items-center justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-auto" />
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {/* Home Button */}

          <NavLink to="/" className='dark:bg-gray-800'>
              <button
                onClick={() => handleNavClick("/")}
                className={`flex items-center gap-3 px-3 py-2 w-full dark:bg-gray-800 text-left rounded-lg transition-colors ${
                  currentPage === "/" ? "bg-gray-50 dark:bg-gray-800  dark:text-gray-200" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                  <Home className="w-5 h-5 text-gray-600 dark:text-gray-200" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Home
                </span>
              </button>
            </NavLink>


          {/* Learning Content Accordion */}
          <div className="mb-2">
            <button
              onClick={() => setIsLearningExpanded(!isLearningExpanded)}
              className="flex  items-center justify-between w-full px-3 py-2 rounded-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                <span className="text-sm font-medium dark:text-gray-200 text-gray-700">
                  Learning content
                </span>
              </div>
              {isLearningExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-200" />
              )}
            </button>

            {/* Expandable Content */}
            {isLearningExpanded && (
              <div className="mt-2 ml-2">
                {/* Level Selection */}
                <div className="px-3 mb-4">
                  <h2 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-200">
                    LEVEL
                  </h2>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full bg-white text-gray-900 dark:text-gray-200 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <option>Choose Your Level</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>C1</option>
                    <option>C2</option>
                  </select>
                </div>

                {/* Categories */}
                <div className="px-3">
                  <h2 className="text-xs font-semibold mb-2 text-gray-600 dark:text-gray-200">
                    CATEGORIES
                  </h2>
                  <div className="flex flex-col gap-1">
                    {categories.map((item, index) => (
                      <NavLink key={index} to={item.label.toLowerCase()}>
                        <button
                          onClick={() =>
                            handleNavClick(
                              `category-${item.label.toLowerCase()}`
                            )
                          }
                          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <span className="text-gray-600 dark:text-gray-200">{item.icon}</span>
                          <span className="text-sm text-gray-700 dark:text-gray-200">
                            {item.label}
                          </span>
                        </button>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {topNavItems.map((item, index) => (
            <NavLink key={index} to={item.page}>
              <button
                onClick={() => handleNavClick(item.page)}
                className={`flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 ${
                  currentPage === item.page ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                <span className="text-gray-600 dark:text-gray-200">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {item.label}
                </span>
              </button>
            </NavLink>
          ))}
        </nav>

        <div className="py-16 space-y-3 flex flex-col">
          <NavLink to="starkla-chat">
            <button
              onClick={() => handleNavClick("starkla-chat")}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium">Talk with Starkla</span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
