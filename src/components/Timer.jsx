import React, { useState, useEffect } from 'react'

export default function Timer() {
  let timer;
  let short;
  let long;
  let timerContent;
  let pomodoroTimer = 25 * 60;
  let shortBreakTimer = 5 * 60;
  let longBreakTimer = 10 * 60;
  // let alarm = new Audio('../../public/alarm.mp3');

//   const alarm = useRef(new Audio('/public/alarm.mp3'));
  const [time, setTime] = useState(pomodoroTimer);
  const [shortTime, setShortTime] = useState(shortBreakTimer);
  const [longTime, setLongTime] = useState(longBreakTimer);
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState(1);

  // Conditional Rendering 
  if (tab === 1) {
    timerContent = (
        <h1 className='font-bold text-[5rem] text-main-color'>
            {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
        </h1>
    );
  }

  else if (tab === 2 ) {
    timerContent = (
        <h1 className='font-bold text-[5rem] text-main-color'>
            {Math.floor(shortTime / 60).toString().padStart(2, '0')}:{(shortTime % 60).toString().padStart(2, '0')}
        </h1>
    );
  }

  else if (tab === 3 ) {
    timerContent = (
        <h1 className='font-bold text-[5rem] text-main-color'>
            {Math.floor(longTime / 60).toString().padStart(2, '0')}:{(longTime % 60).toString().padStart(2, '0')}
        </h1>
    );
  }

  const pomodoro = () => {
    timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setTime(pomodoroTimer);
            setIsRunning(false);
            alarm.current.play();
            return 0;
          } 
          else {
            return prevTime - 1;
          }
        });
      }, 1000);
  }

  const shortBreak = () =>  {
    short = setInterval(() => {
        setShortTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(short);
            setShortTime(shortBreakTimer);
            setIsRunning(false);
            // alarm.current.play();
            return 0;
          } 
          else {
            return prevTime - 1;
          }
        });
      }, 1000);
  }

  const longBreak = () =>  {
    long = setInterval(() => {
        setLongTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(long);
            setLongTime(longBreakTimer);
            setIsRunning(false);
            // alarm.current.play();
            return 0;
          } 
          else {
            return prevTime - 1;
          }
        });
      }, 1000);
  }

  // When the timer starts
  const startTimer = () => {
    setIsRunning(true);
  };

  // When the timer resets
  const resetTimer = () => {
    clearInterval(timer);
    setTime(pomodoroTimer);
    setShortTime(shortBreakTimer);
    setLongTime(longBreakTimer);
    setIsRunning(false);
  }

  // Tabs
  const toggle = (id) => {
    setIsRunning(false);
    setTab(id);
  }

  // Pomodoro Timer
  useEffect(() => {

    if (isRunning) {
       if (tab === 1) {
        pomodoro();
       }
    }

   return () => clearInterval(timer);

  }, [isRunning]);

  // Short Break
  useEffect(() => {

    if (isRunning) {
       if (tab === 2) {
        shortBreak();
       }
    }

   return () => clearInterval(short);

  }, [isRunning]);

  // Long Break
  useEffect(() => {

    if (isRunning) {
       if (tab === 3) {
        longBreak();
       }
    }

   return () => clearInterval(long);

  }, [isRunning]);
    return (
        <>
            <div className='select-none bg-[#F2F7FF] p-10 rounded-lg shadow-md '>
                <div className='flex items-center flex-col'>
                    <div className='flex gap-4 text-[0.875rem]'>
                        <button className='text-font-color focus:bg-main-color focus:text-white rounded-md p-2' onClick={() => toggle(1)}>Pomodoro</button>
                        <button className='text-font-color focus:bg-main-color focus:text-white rounded-md p-2' onClick={() => toggle(2)}>Short Break</button>
                        <button className='text-font-color focus:bg-main-color focus:text-white rounded-md p-2' onClick={() => toggle(3)}>Long Break</button>
                    </div>
                    {timerContent}
                        {
                            isRunning
                            ? 
                            <button 
                            className='text-white border-secondary-color border border-solid w-full lg:w-[35%] text-center py-3 rounded-md
                                            hover:opacity-70 bg-main-color'
                            onClick={resetTimer}
                            >
                                Reset
                            </button>
                            :
                            <button 
                            className='text-white border-secondary-color border border-solid w-full lg:w-[35%] text-center py-3 rounded-md
                                            hover:opacity-70 bg-main-color'
                            onClick={startTimer}
                            disabled={isRunning}
                            >
                                Start
                            </button>
                        }
                </div>
            </div>
        </>
    )
}