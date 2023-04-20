import Timer from "../components/Timer"
import TimerPlus from '../components/TimerPlus';
import { ProgressBar } from 'primereact/progressbar';
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { TimerThunks } from '../redux/thunks/timer';
import React, { useEffect, useRef, useState } from 'react';

function Dashboard() {
  const constraintsRef = useRef(null);
  const { global, timers } = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TimerThunks.getTimers())
  }, [])



  if (timers.isLoading) return <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>

  if (timers.isError) return 'An error has occurred: ' + timers.isError
  // console.log(reqs)
  return (
    <div
      className='relative'
    >
      <div className="App mt-2 px-2"
        ref={constraintsRef}
      >
        {[...timers.timers].sort(function (a, b) {
          return a.date - b.date;
        }).map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              index={idx}
              {...item}
              format={global.format}
              publicAccess={item.ipaddress === '0.0.0.0/0'}
            />)
          else return (<TimerPlus
            index={idx}
            key={idx}
            {...item}
            format={global.format}
            publicAccess={item.ipaddress === '0.0.0.0/0'}
          />)
        })
        }
      </div>
    </div>

  );
}

export default Dashboard;
