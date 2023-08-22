import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { deleteTask } from '../api'
import { useMutation } from 'react-query'
import { Skeleton } from 'primereact/skeleton'
import { useNavigate, useLocation } from 'react-router-dom'

const TimerGame = ({ title, date, _id, format, index }) => {
  const secondsLeftRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const secondsLeft = Math.ceil((date[0] - Date.now()) / 1000)
  const [timeLeft, setTimeLeft] = useState(secondsLeft)
  useEffect(() => {
    secondsLeftRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1
        return 0
      })
    }, 1000)

    return () => {
      clearInterval(secondsLeftRef.current)
    }
  }, [])

  const { mutate, isLoading } = useMutation(deleteTask, {
    onSuccess: (data) => {
      window.location.reload()
    },
    onError: () => {
      alert('there was an error')
    },
  })

  return (
    <motion.div className="bg-black p-2 m-2  flex justify-between items-center">
      {isLoading ? (
        <Skeleton className="bg-sky-500" height="90px" />
      ) : (
        <>
          <motion.div onClick={() => navigate('/fullscreen?_id=' + _id)}>
            <p className="text-white">{title}</p>
            <div className="truncate timerText" ref={secondsLeftRef}>
              -
              {format === 'seconds'
                ? `${timeLeft}`
                : `${Math.floor(timeLeft / (3600 * 24))}:${Math.floor(
                    (timeLeft % (3600 * 24)) / 3600,
                  )}:${Math.floor((timeLeft % 3600) / 60)}:${Math.floor(
                    timeLeft % 60,
                  )}`}
            </div>
          </motion.div>
          {location.pathname === '/' ? (
            <></>
          ) : (
            <i
              onClick={() =>
                mutate({
                  _id,
                })
              }
              className="text-gray-800 pi pi-times"
              aria-label="Filter"
            />
          )}
        </>
      )}
    </motion.div>
  )
}

export default TimerGame
