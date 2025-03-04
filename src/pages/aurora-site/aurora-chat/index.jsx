import React, { useState } from "react";
import {
  Mic,
  ChevronLeft,
  ChevronRight,
  LightbulbIcon,
  FileIcon,
} from "lucide-react";
import ElizaBot from "elizabot";
import starklaImage from "@/assets/starkla.jpg";
import styles from "./aurora-chat.module.css";
import RenderFileUploadMessage from "./render-file-upload-message";
import PreviewModal from "./file-preview-modal";

const StarklaChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [previewMessage, setPreviewMessage] = useState(null);

  const eliza = new ElizaBot();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      const userMessage = {
        type: "text",
        content: inputText,
        isEliza: false,
      };

      setMessages([...messages, userMessage]);
      setInputText("");

      setIsTyping(true);

      setTimeout(() => {
        const elizaResponse = {
          type: "text",
          content: eliza.transform(inputText),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];
    const reader = new FileReader();

    let message = {
      type: "file",
      fileType,
      fileName: file.name,
      fileSize: file.size,
      isEliza: false,
    };

    reader.onload = (event) => {
      const result = event.target.result;

      if (file.type === "application/pdf") {
        const blob = new Blob([result], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        message = {
          ...message,
          content: url,
        };
      } else {
        message = {
          ...message,
          content: result,
        };
      }

      setPreviewMessage(message);
    };

    reader.onerror = () => {
      // Handle errors during file reading
      console.error("FileReader error occurred.");
      // Optionally set some error message to the user
    };

    if (fileType === "image" || fileType === "audio") {
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      reader.readAsArrayBuffer(file);
    } else if (fileType === "text") {
      reader.readAsText(file);
    } else {
      setPreviewMessage(message); // For types without content, directly preview fileName
    }
  };

  const handleSendFile = () => {
    if (previewMessage) {
      setMessages((prevMessages) => [...prevMessages, previewMessage]);

      if (
        previewMessage.content &&
        previewMessage.content.startsWith("blob:")
      ) {
        setTimeout(() => URL.revokeObjectURL(previewMessage.content), 10000);
      }

      setPreviewMessage(null);

      setIsTyping(true);

      setTimeout(() => {
        const elizaResponse = {
          type: "text",
          content: eliza.transform(inputText),
          isEliza: true,
        };

        setMessages((prev) => [...prev, elizaResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleCancelPreview = () => {
    if (
      previewMessage &&
      previewMessage.content &&
      previewMessage.content.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewMessage.content); // Revoke URL if preview cancelled for PDFs
    }
    setPreviewMessage(null);
  };

  const handleChangeFile = () => {
    handleCancelPreview();
    setPreviewMessage(null);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Header */}
      <div className="flex items-center w-full px-6 py-2 border-b border-gray-100">
        {/* Left: Profile Section */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 overflow-hidden rounded-full">
            <img
              src={starklaImage}
              alt="Starkla Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">STARKLA</h1>
            <h2 className="text-sm text-gray-600">
              Software Architecture lesson - Chapter 1
            </h2>
          </div>
        </div>

        {/* Right: Unit Navigation */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-gray-600">Current unit: 1</span>
          <div className="flex gap-1">
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous unit"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next unit"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full gap-4 px-6 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.isEliza ? styles.messageEliza : styles.messageUser
            } ${
              message.type === "file" ? "!bg-transparent" : "shadow-md p-4"
            }  max-w-40`}
          >
            {message.type === "file" ? (
              <div className="flex items-center gap-1">
                <RenderFileUploadMessage message={message} />
              </div>
            ) : (
              <p className="break-all">{message.content}</p>
            )}
          </div>
        ))}

        {/* Eliza Typing */}
        {isTyping && (
          <div
            className={`${styles.message} ${styles.messageEliza} shadow-md p-4`}
          >
            <div className={styles.dotAnimate}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="sticky bottom-0 w-full px-6 py-4 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center w-full gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            <LightbulbIcon className="w-5 h-5" />
            <span>Start learning</span>
          </button>

          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Write something related to the topic"
              className="w-full px-4 py-2 pr-24 transition-colors bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute flex items-center gap-2 transform -translate-y-1/2 right-2 top-1/2">
              <label className="cursor-pointer p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                {!previewMessage && (
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                )}
                <FileIcon className="w-5 h-5" />
              </label>
              <button
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors shadow-md"
                aria-label="Voice Input"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* File preview modal */}
      {previewMessage && (
        <PreviewModal
          message={previewMessage}
          onClose={handleCancelPreview}
          onSend={handleSendFile}
          onChangeFile={handleChangeFile}
        />
      )}
    </div>
  );
};

export default StarklaChat;
