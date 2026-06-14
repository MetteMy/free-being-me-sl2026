import AudioPlayer from 'react-h5-audio-player';
import useSound from 'use-sound';

import 'react-h5-audio-player/lib/styles.css';
interface SoundButtonProps {
  soundUrl: string; 
  buttonText: string;
}

// interface OptionProps {
//     correct: number;
//     optionList: [];
// }


// export const optionbuttons = ({correct, optionList}: OptionProps) => {

//     return (
//         {
//     ((option, index) => (
//             <button key={index} onClick={() => handleAnswerClick(index)}>
//               {option}
//             </button>
//     }
// )



// }

import { useRef, useState } from "react";

export function SoundButton({ soundUrl }: { soundUrl: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);

      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <button className="sound-button" onClick={toggle}>
        {isPlaying ? "⏸" : "▶"}
      </button>

      <audio ref={audioRef} src={soundUrl} />
    </>
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



