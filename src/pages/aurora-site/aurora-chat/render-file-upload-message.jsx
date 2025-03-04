import PropTypes from "prop-types";
import CustomAudioPlayer from "./custom-audio-player";
import { FileIcon } from "lucide-react";

export default function RenderFileUploadMessage({ message }) {
  if (!message?.fileType) {
    return null;
  }

  const isImage = message?.fileType.startsWith("image");
  const isAudio = message?.fileType.startsWith("audio");
  const isPDF = message?.fileType === "application";
  const fileExtension = message?.fileName?.split(".")?.pop() || "";

  return (
    <div className="relative flex flex-wrap items-start gap-3 p-3 mb-2 text-white bg-[#2b6cb0] rounded-lg">
      {isImage ? (
        <div className="flex min-w-full">
          <img
            src={message.content}
            alt={message.fileName}
            className="flex-1 object-cover w-32 h-32 max-w-full mx-auto rounded-md aspect-square"
          />
        </div>
      ) : isAudio ? (
        <div className="relative flex items-center justify-center w-12 h-12 mb-auto text-2xl rounded-md bg-white/50">
          🎵
          <CustomAudioPlayer src={message.content} />
        </div>
      ) : isPDF ? (
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-white/50">
          <FileIcon className="w-5 h-5 text-blue-600" />
        </div>
      ) : (
        <div className="flex items-center justify-center w-12 h-12 rounded-md bg-white/50">
          ❓
        </div>
      )}
      <div className="flex-1">
        <p className="w-full text-xs font-semibold break-all line-clamp-2">
          {message?.fileName}
        </p>
        <p className="self-start text-xs text-gray-300">
          {fileExtension.toUpperCase()} •{" "}
          {(message?.fileSize / 1024).toFixed(1)} KB
        </p>
      </div>
    </div>
  );
}

RenderFileUploadMessage.propTypes = {
  message: PropTypes.shape({
    fileType: PropTypes.string,
    content: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
  }),
};
