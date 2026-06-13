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





export const SoundButton = ({ soundUrl, buttonText }: SoundButtonProps) => {

  const [play] = useSound(soundUrl);

  return (
    <AudioPlayer

    className="my-audio-player"
    autoPlay
    src={soundUrl}
    onPlay={() => console.log("onPlay")}
    // other props here
  />
    // <button onClick={() => play()}>
    //     {buttonText}
    // </button>




  );
}