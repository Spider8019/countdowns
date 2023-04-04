import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Timer from "./components/Timer"
import TimerPlus from './components/TimerPlus';
import FormInput from './components/FormInput';
import { allTask, getIp } from './api';
import Navbar from './components/global/Navbar';

function App() {
  const constraintsRef = useRef(null);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [reqs, setReqs] = useState([{
    title: "Break up with shweta",
    date: new Date("2022-12-24"),
    type: "+"
    // clockColor:"red"
  }, {
    title: "Things gone wrong with shipra",
    date: new Date("2023-04-01T22:00:00+05:30"),
    type: "+"
  }, {
    title: "Masturbated Last Time",
    date: new Date("2023-04-01T16:20:00+05:30"),
    type: "+"
  }, {
    title: "Carbonated Drink's Break till",
    date: new Date("2023-09-21"),
    type: "-"
  }, {
    title: "New year 2024",
    date: new Date("2024-01-01"),
    type: "-"
  }, {
    title: "College life will end in",
    date: new Date("2023-05-10"),
    type: "-"
  }])
  useEffect(() => {
    allTask().then(data => { console.log(data); setReqs(data) })
      .catch(err => console.log(err))
  }, [])

  // if (reqs.length === 0)
  //   return <p className='p-2 text-center text-white-500'>Loading...</p>
  return (
    <React.Fragment>
      <Navbar
        visibleBottom={visibleBottom}
        setVisibleBottom={setVisibleBottom} />
      <div className="App mt-2"
        ref={constraintsRef}
      >
        <FormInput
          visibleBottom={visibleBottom}
          setVisibleBottom={setVisibleBottom}
        />
        {reqs.map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              {...item}
            />)
          else return (<TimerPlus
            key={idx}
            {...item}
          />)
        })
        }
      </div>
    </React.Fragment>

  );
}

export default App;
