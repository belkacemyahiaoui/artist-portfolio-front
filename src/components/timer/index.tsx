import { useEffect, useState } from "react";

function Timer({ recording }: { recording: boolean }) {
  const [timer, setTimer] = useState<number>(0);
  useEffect(() => {
    let interval: number;

    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!recording && timer !== 0) {
      clearInterval(interval!);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [recording, timer]);

  if (!recording) {
    return <div>0 seconds</div>;
  }

  return <div>{timer} seconds</div>;
}

export default Timer;
