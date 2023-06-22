import { useState, useRef } from 'react';
import { AiFillBackward, AiFillForward, AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const { currentTime, duration } = audioRef.current;
    const progressPercentage = (currentTime / duration) * 100;
    setProgress(progressPercentage);
  };

  const handleBackward = () => {
    audioRef.current.currentTime -= 10; // Go back 10 seconds (adjust as needed)
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10; // Go forward 10 seconds (adjust as needed)
  };

  return (
    <div style={{width:"70vw",padding:"1vw"}}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="flex justify-center items-center p-2 gap-10">

      <button onClick={handleBackward}>
            <AiFillBackward size={20} color='white'/>
        </button>
 
      <button onClick={togglePlay}>
        {isPlaying ? <AiFillPauseCircle size={30} color='white'/> : <AiFillPlayCircle size={30} color='white'/> }
        </button>

        <button onClick={handleForward}>
            <AiFillForward  size={20} color='white'/>
        </button>
      </div>
      <div>
        <div
          style={{
            width: '100%',
            height: '5px',
            backgroundColor: '#ccc',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: 'green',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
