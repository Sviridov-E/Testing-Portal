import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const showTime = time => {
    let min, sec;
    sec = (time / 1000) % 60;
    min = time > 60000 ? ((time / 1000) - sec) / 60 : 0;
    return `${min < 10 ? '0'+min : min}:${sec < 10 ? '0'+sec : sec}`
  }

export const Timer = props => {
    const [time, setTime] = useState(null);
    const [littleTimeClass, setLittleTimeClass] = useState(false);

    useEffect(() => {
        setTime(props.timeout);
        let interval = setInterval(() => {
            setTime(time => {
                if(time === 1000){
                    clearInterval(interval);
                    return time-1000;
                }
                return time-1000;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [props.timeout])

    useEffect(() => {
        if(time <= 3000 && time !== null) {            
            setLittleTimeClass(true)
        }
        if(time === 0) props.finishTest();
         
    }, [time, props])

    return (
        <div className="timer">
            <h6 className="time">Осталось времени: <strong className={littleTimeClass ? 'little-time' : ''}>{showTime(time)}</strong></h6>
        </div>
    )
}