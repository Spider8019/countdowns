import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { deleteTask } from "../api";

const TimerGame = ({ title, date, _id, refetch, publicAccess, format, index, setSelectedId }) => {
    const secondsWeHaveRef = useRef(null)
    const secondsWeHave = Math.ceil((Date.now() - date) / 1000);
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
            refetch();
        }).catch(err => console.log(err))
    }

    return <motion.div
        className="bg-black p-2 m-2 rounded flex justify-between items-center"
    >
        <motion.div
            onClick={() => setSelectedId(index)}
            className="">
            <p className="text-white">{title}{publicAccess && <span className="text-sm">Public</span>}</p>
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
        {!publicAccess
            &&
            <i className="pi pi-times text-gray-800"
                onClick={() => deleteT(_id)}
                aria-label="Filter" />
        }
    </motion.div>

};

export default TimerGame;
