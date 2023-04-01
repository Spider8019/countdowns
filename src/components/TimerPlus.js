import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TimerGame = ({ title, date, clockColor }) => {
    const secondsWeHaveRef = useRef(null)
    const secondsWeHave = Math.ceil((Date.now() - date) / 1000);
    const [timeWeHave, setTimeWeHave] = useState(secondsWeHave);
    console.log(date)
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

    return <motion.div
        className="timer-game timerPlus-game"
    >
        <p>{title}</p>
        <div className="truncate timer"
            style={{ color: "#33ff14" }}
            ref={secondsWeHaveRef}
        >+{timeWeHave}</div>
    </motion.div>

};

export default TimerGame;
