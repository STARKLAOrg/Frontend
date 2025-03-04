import { useState, useRef } from "react";
import PropTypes from "prop-types";

export default function CustomAudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <button onClick={togglePlay} className="absolute z-10 p-0 tex.t-lg text-white -translate-x-1/2 -translate-y-1/2 !bg-transparent opacity-40 hover:opacity-100 !outline-none !border-none top-1/2 left-1/2">
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <audio ref={audioRef} src={src} />
    </>
  );
}

CustomAudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};
