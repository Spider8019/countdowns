import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const TimerGame = ({ title, date, constraintsRef,clockColor }) => {
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

    return <motion.div
        className="timer-game"
    >
        <p>{title}</p>
        <div className="timer"
            ref={secondsLeftRef}
        >-{timeLeft}</div>
    </motion.div>

};

export default TimerGame;
