import React, { useState, useRef, useEffect } from 'react';
import { Knob } from 'primereact/knob';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom'

const Fullscreen = () => {
    // const [value, setValue] = useState(Date.now());
    const [searchParams] = useSearchParams()
    const secondsLeftRef = useRef(null)
    const [data] = useSelector(state => state.timers.timers.filter(item => item._id === searchParams.get('_id')))
    console.log(data)
    const secondsLeft = Math.ceil((data.date - new Date(data.createdAt).getTime()) / 1000);
    const [timeLeft, setTimeLeft] = useState(secondsLeft);
    console.log(data)
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
        <div className=' grid place-items-center gap-8 justify-center items-center'
            style={{ height: "calc(100vh - 44px)" }}
        >
            <div>
                <div
                    className='mx-auto grid place-items-center'
                >
                    <Knob
                        value={(timeLeft / secondsLeft) * 100}
                        strokeWidth={4}
                        size={300}
                        valueColor="red"
                    />
                </div>
                <div className='text-center text-white'>
                    <p className='text-3xl font-semibold'>{data.title}</p>
                    <p className='text-5xl w-screen'>{timeLeft} <i className="pi pi-arrow-right-arrow-left"></i> {("0"+Math.floor(timeLeft / (3600 * 24)).toString()).slice(-2)}:{("0"+Math.floor(timeLeft % (3600 * 24) / 3600)).toString().slice(-2)}:{("0"+Math.floor(timeLeft % 3600 / 60).toString()).slice(-2)}:{("0"+Math.floor(timeLeft % 60).toString()).slice(-2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Fullscreen