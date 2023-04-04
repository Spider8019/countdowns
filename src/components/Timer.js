import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { deleteTask } from "../api";

const TimerGame = ({ title, date, _id }) => {
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

    const deleteT = (_id) => {
        deleteTask({ _id }).then(data => {
            console.log(data);
        }).catch(err => console.log(err))
    }

    return <motion.div
        className="bg-black p-2 m-2 rounded flex justify-between items-center"
    >
        <div>
            <p className="text-white">{title}</p>
            <div className="truncate timerText"
                ref={secondsLeftRef}
            >-{timeLeft}</div>
        </div>
        <Button
            onClick={() => deleteT(_id)}
            icon="pi pi-times"
            className="text-gray-800"
            rounded outlined aria-label="Filter" />
    </motion.div>

};

export default TimerGame;
