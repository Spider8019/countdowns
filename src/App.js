import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Timer from "./components/Timer"
import TimerPlus from './components/TimerPlus';
import FormInput from './components/FormInput';
import { allTask } from './api';
import Navbar from './components/global/Navbar';

function App() {
  const constraintsRef = useRef(null);
  const [visibleBottom, setVisibleBottom] = useState(false);
  const [reqs, setReqs] = useState([])
  useEffect(() => {
    allTask().then(data => { console.log(data); setReqs(data) })
      .catch(err => console.log(err))
  }, [])

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
