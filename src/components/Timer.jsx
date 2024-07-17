import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

export default function Timer() {
  const [time, setTime] = useState(25 * 60); 
  const [shortTime, setShortTime] = useState(5 * 60); 
  const [longTime, setLongTime] = useState(10 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState(1);
  const alarm = useRef(new Audio('/public/alarm.mp3'));

  useEffect(() => {
    let timer;
    if (isRunning) {
      if (tab === 1) {
        timer = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timer);
              setTime(25 * 60);
              setIsRunning(false);
              alarm.current.play();
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
      } else if (tab === 2) {
        timer = setInterval(() => {
          setShortTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timer);
              setShortTime(5 * 60);
              setIsRunning(false);
              // alarm.current.play();
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
      } else if (tab === 3) {
        timer = setInterval(() => {
          setLongTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timer);
              setLongTime(10 * 60);
              setIsRunning(false);
              // alarm.current.play();
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, tab]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
    setShortTime(5 * 60);
    setLongTime(10 * 60);
  };

  const toggle = (id) => {
    setIsRunning(false);
    setTab(id);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='select-none bg-[#F2F7FF] p-10 rounded-lg shadow-md'>
      <div className='flex items-center flex-col gap-4'>
        <div className='flex gap-5 text-[0.875rem]'>
          <button
            className={`text-font-color ${tab === 1 ? 'bg-main-color text-white text-sm' : ''} rounded-md p-2`}
            onClick={() => toggle(1)}
          >
            Pomodoro
          </button>
          <button
            className={`text-font-color ${tab === 2 ? 'bg-main-color text-white text-sm' : ''} rounded-md p-2`}
            onClick={() => toggle(2)}
          >
            Short Break
          </button>
          <button
            className={`text-font-color ${tab === 3 ? 'bg-main-color text-white text-sm' : ''} rounded-md p-2`}
            onClick={() => toggle(3)}
          >
            Long Break
          </button>
        </div>
        <h1 className='font-bold text-[3rem] md:text-[5rem] text-main-color'>
          {tab === 1 ? formatTime(time) : tab === 2 ? formatTime(shortTime) : formatTime(longTime)}
        </h1>
        {isRunning ? (
          <div>
            <Button
            className='text-white border-secondary-color border border-solid w-full lg:w-[35%] text-center py-3 rounded-md hover:opacity-70 bg-main-color'
            onClick={resetTimer}
            >
                Reset
            </Button>
          </div>
        ) 
        : 
        (
          <div className=''>
            <Button
            className='text-white border-secondary-color border border-solid w-full lg:w-[35%] text-center py-2 rounded-md hover:opacity-70 bg-main-color'
            onClick={startTimer}
            >
                Start
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
