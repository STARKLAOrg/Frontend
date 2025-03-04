import PropTypes from "prop-types";
import RenderFileUploadMessage from "./render-file-upload-message";

export default function PreviewModal({
  message,
  onClose,
  onSend,
  onChangeFile,
}) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed min-h-screen w-screen top-0 left-0 flex items-center justify-center bg-black/50 z-[1000]">
      <div className="bg-white p-4 flex flex-col gap-4 rounded-lg max-w-[MIN(500px,80%)] max-h-[MIN(400px,80%)] overflow-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">File Preview</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-0 text-lg bg-transparent border rounded-full cursor-pointer size-8"
          >
            <span aria-hidden="true" className="p-1 leading-none rounded-full">
              &times;
            </span>
          </button>
        </div>

        <div className="flex flex-col max-w-full gap-2 mb-4">
          <RenderFileUploadMessage message={message} />
        </div>

        <div className="flex items-end gap-4">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onChangeFile}>Change File</button>
          <button onClick={onSend} className="font-bold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

PreviewModal.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.string,
    fileType: PropTypes.string,
    content: PropTypes.string,
    fileName: PropTypes.string,
    fileSize: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
};
