import PropTypes from "prop-types";

export default function RenderFileUploadMessage({ message }){
  if (!message?.fileType) {
    return null;
  }

  switch (message?.fileType) {
    case "image":
      return (
        <img
          src={message.content}
          alt={message.fileName}
          className="object-cover w.-32 h-32 max-w-full"
        />
      );
    case "audio":
      return <audio controls src={message.content} />;
    case "text":
      return (
        <pre className="p-2 border-white border bg-white text-black max-h-24 max-w-[200px] overflow-scroll rounded">
          {message.content}
        </pre>
      );
    case "application":
      if (message.fileName.endsWith(".pdf")) {
        return (
          <embed
            src={message.content}
            type="application/pdf"
            className="w-full h-64"
            alt={message.fileName}
          />
        );
      }
      return (
        <p>Preview not available for this file type: {message.fileName}</p>
      );

    default:
      return (
        <p>Preview not available for this file type: {message.fileName}</p>
      );
  }
};

RenderFileUploadMessage.propTypes = {
  message: PropTypes.shape({
    fileType: PropTypes.string,
    content: PropTypes.string,
    fileName: PropTypes.string,
  }),
};
