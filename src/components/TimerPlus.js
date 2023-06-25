import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { deleteTask } from "../api";
import { useNavigate } from "react-router-dom";

const TimerGame = ({ title, date, _id, format }) => {
    const secondsWeHaveRef = useRef(null)
    const navigate = useNavigate();
    const secondsWeHave = Math.ceil((Date.now() - date[date.length-1]) / 1000);
    const [timeWeHave, setTimeWeHave] = useState(secondsWeHave);
    useEffect(() => {
        secondsWeHaveRef.current = setInterval(() => {
            setTimeWeHave((timeLeft) => {
                if (timeLeft >= 1) return timeLeft + 1;
                return 0;
            });
        }, 1000);

        return () => {
            clearInterval(secondsWeHaveRef.current);
        };
    }, []);

    const deleteT = (_id) => {
        deleteTask({ _id }).then(data => {
            console.log(data);
            window.location.reload();
        }).catch(err => console.log(err))
    }

    return <motion.div
        className="bg-black p-2 m-2 rounded flex justify-between items-center"
    >
        <motion.div
            onClick={() => navigate("/fullscreenplus?_id=" + _id)}
            className="">
            <p className="text-white">{title}</p>
            <div className="truncate timerText"
                style={{ color: "#33ff14" }}
                ref={secondsWeHaveRef}
            >+{format === 'seconds'
                ?
                `${timeWeHave}`
                :
                `${Math.floor(timeWeHave / (3600 * 24))}:${Math.floor(timeWeHave % (3600 * 24) / 3600)}:${Math.floor(timeWeHave % 3600 / 60)}:${Math.floor(timeWeHave % 60)}`
                }</div>
        </motion.div>
        <i className="pi pi-times text-gray-800"
            onClick={() => deleteT(_id)}
            aria-label="Filter" />
    </motion.div>

};

export default TimerGame;
