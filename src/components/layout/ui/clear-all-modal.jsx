// clear-all-modal.jsx
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const ClearAllModal = ({ onClearAll,filter }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={`px-4 py-2 rounded ${
            filter === "clear all" ? "bg-gray-800 text-white" : "bg-gray-200"
          }`}
        >
          Clear All
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Notifications</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all
            Notifications from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClearAll}
            className="bg-[#ef4444] hover:border-none hover:bg-red-700 text-white border-none"
          >
            Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ClearAllModal;
