import Timer from "../components/Timer"
import TimerPlus from '../components/TimerPlus';
import { ProgressBar } from 'primereact/progressbar';
import { useDispatch, useSelector } from 'react-redux';
import { TimerThunks } from '../redux/thunks/timer';
import React, { useEffect, useRef } from 'react';

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
            />)
          else return (<TimerPlus
            index={idx}
            key={idx}
            {...item}
            format={global.format}
          />)
        })
        }
      </div>
    </div>

  );
}

export default Dashboard;
