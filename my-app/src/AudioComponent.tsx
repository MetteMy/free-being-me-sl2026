
import useSound from 'use-sound';

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
    <button onClick={() => play()}>
        {buttonText}
    </button>




  );
}