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
  const [reqs, setReqs] = useState([])
  useEffect(() => {
    allTask().then(data => { console.log(data); setReqs(data) })
      .catch(err => console.log(err))
  }, [])

  if (reqs.length === 0)
    return <p className='p-2 text-center text-white-500'>Loading...</p>

  return (
    <React.Fragment>
      <Navbar
        visibleBottom={visibleBottom}
        setVisibleBottom={setVisibleBottom} />
      <div className="App mt-2 px-2"
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
