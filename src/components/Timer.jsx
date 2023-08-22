import  React, { useState, useEffect } from 'react';

function Timer  (){
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);

      if (seconds === 59) {
        setSeconds(0);
        setMinutes(prevMinutes => prevMinutes + 1);
      }

      if (minutes === 59) {
        setMinutes(0);
        setHours(prevHours => prevHours + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds, minutes]);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div>
      <p>{formattedTime}</p>
    </div>
  );
}

export default Timer;
