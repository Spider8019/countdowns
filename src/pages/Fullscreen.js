import React, { useState, useRef, useEffect } from 'react';
import { Knob } from 'primereact/knob';

const Fullscreen = () => {
    const [value, setValue] = useState(Date.now());
    const secondsLeftRef = useRef(null)
    const secondsLeft = Math.ceil((1681773000000 - Date.now()) / 1000);
    const [timeLeft, setTimeLeft] = useState(secondsLeft);
    useEffect(() => {
        secondsLeftRef.current = setInterval(() => {
            setTimeLeft((timeLeft) => {
                if (timeLeft >= 1) return timeLeft - 1;
                return 0;
            });
        }, 1000);

        return () => {
            clearInterval(secondsLeftRef.current);
        };
    }, []);

    return (
        <div className='flex justify-center items-center h-full'>
            <Knob value={(secondsLeft-timeLeft)/100}
                strokeWidth={1}
                valueTemplate={'{value}%'}
                size={300}
                valueColor="red" 
                rangeColor="#48d1cc"
            // step={40} 
            />
            <div>
                <p className='text-5xl text-white'>{timeLeft}##{(secondsLeft-timeLeft)}</p>
            </div>
        </div>
    )
}

export default Fullscreen