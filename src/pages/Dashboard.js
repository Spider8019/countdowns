import React, { useRef, useState } from 'react';
import Timer from "../components/Timer"
import TimerPlus from '../components/TimerPlus';
import { allTask } from '../api';
import { useQuery } from 'react-query';
import { ProgressBar } from 'primereact/progressbar';
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from 'react-redux';

function Dashboard() {
  const constraintsRef = useRef(null);
  const { global } = useSelector(state => state)

  const [selectedId, setSelectedId] = useState(null)

  const { isLoading, error, data: reqs, refetch } = useQuery('repoData', allTask)
  if (isLoading) return <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>

  if (error) return 'An error has occurred: ' + error.message
  console.log(reqs)
  return (
    <div
      className='relative'
    >
      adfas
      <div className="App mt-2 px-2"
        ref={constraintsRef}
      >
        {[...reqs.yourTasks, ...reqs.publicTasks].sort(function (a, b) {
          return a.date - b.date;
        }).map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              index={idx}
              {...item}
              format={global.format}
              publicAccess={item.ipaddress === '0.0.0.0/0'}
              setSelectedId={setSelectedId}
              refetch={refetch}
            />)
          else return (<TimerPlus
            index={idx}
            key={idx}
            {...item}
            format={global.format}
            publicAccess={item.ipaddress === '0.0.0.0/0'}
            setSelectedId={setSelectedId}
            refetch={refetch}
          />)
        })
        }
      </div>
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-red-400 p-4 rounded h-screen absolute top-0 right-0 left-0 bottom-0'>
            <motion.h5>"subtitle"</motion.h5>
            <motion.h2>"title"</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}

export default Dashboard;
