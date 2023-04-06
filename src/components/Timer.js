import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { deleteTask } from "../api";
import { useMutation } from 'react-query';
import { Skeleton } from 'primereact/skeleton';

const TimerGame = ({ title, date, _id, refetch, publicAccess }) => {
    const secondsLeftRef = useRef(null)
    const secondsLeft = Math.ceil((date - Date.now()) / 1000);
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

    const { mutate, isLoading } = useMutation(deleteTask, {
        onSuccess: data => {
            console.log(data);
            refetch()
        },
        onError: () => {
            alert("there was an error")
        }
    });

    return <motion.div
        className="bg-black p-2 m-2 rounded flex justify-between items-center"
    >
        {isLoading ?
            <Skeleton className="bg-sky-500"
                height="90px"
            />
            :
            <>
                <div>
                    <p className="text-white">{title}{publicAccess && <i style={{ fontSize: "0.75rem" }} className="ml-2 text-sm pi pi-box"></i>}</p>
                    <div className="truncate timerText"
                        ref={secondsLeftRef}
                    >-{timeLeft}</div>
                </div>
                {
                    !publicAccess
                    &&
                    <i
                        onClick={() => mutate({
                            _id
                        })}
                        className="text-gray-800 pi pi-times"
                        aria-label="Filter" />
                }
            </>
        }
    </motion.div>

};

export default TimerGame;
