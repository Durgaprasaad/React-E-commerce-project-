import React, { useState, useEffect } from 'react';
import "../styles/clock.css";

const Clock = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: difference % 1000,
      };
    } else {
      timeLeft = {
        // days: 0,
        // hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='clock '>
      <div className='clock_data'>
        <div className='text_center'>
          <h1>10</h1>
          <h5 className='bottom'>Days</h5>
        </div>
        <span>:</span>
      </div>

      <div className='clock_data'>
        <div className='text_center'>
          <h1>5</h1>
          <h5 className='bottom'>Hours</h5>
        </div>
        <span>:</span>
      </div>

      <div className='clock_data'>
        <div className='text_center'>
          <h1>{timeLeft.minutes}</h1>
          <h5 className='bottom '>Minutes</h5>
        </div>
        <span>:</span>
      </div>

      <div className='clock_data'>
        <div className='text_center'>
          <h1>{timeLeft.seconds}</h1>
          <h5 className='bottom'>Seconds</h5>
        </div>
        {/* <span>:</span> */}
      </div>

      {/* <div className='clock_data'>
        <div className='text_center'>
          <h1>{timeLeft.milliseconds}</h1>
          <h5>Milliseconds</h5>
        </div>
      </div> */}
    </div>
  );
};

export default Clock;
