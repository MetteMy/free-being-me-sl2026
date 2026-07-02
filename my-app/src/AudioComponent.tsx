
import { FaPlay, FaPause } from "react-icons/fa";

import 'react-h5-audio-player/lib/styles.css';


import { useEffect, useRef, useState } from "react";

export function SoundButton({ soundUrl }: { soundUrl: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Rebuild the audio whenever the sound changes (e.g. moving to the next question).
  useEffect(() => {
    const audio = new Audio(soundUrl);
    audioRef.current = audio;
    setIsPlaying(false);

    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", onEnded);
    };
  }, [soundUrl]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="sound-wrapper">
      <button
        className={`sound-button ${isPlaying ? "playing" : ""}`}
        onClick={toggle}
        type="button"
      >
         {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
// export const SoundButton = ({ soundUrl, buttonText }: SoundButtonProps) => {

//   const [play] = useSound(soundUrl);

//   return (
//     <div className="audio-wrapper">
//     <AudioPlayer

//     className="my-audio-player"
//     autoPlay
//     src={soundUrl}
//     onPlay={() => console.log("onPlay")}
//     // other props here
//   /></div>
//     // <button onClick={() => play()}>
//     //     {buttonText}
//     // </button>
//   );
// }



