import './App.css';
import React, { useRef, useState } from 'react';
import Timer from "./components/Timer"
import TimerPlus from './components/TimerPlus';
import FormInput from './components/FormInput';
import { allTask } from './api';
import Navbar from './components/global/Navbar';
import { useQuery } from 'react-query';

function App() {
  const constraintsRef = useRef(null);
  const [visibleBottom, setVisibleBottom] = useState(false);

  const { isLoading, error, data: reqs, refetch } = useQuery('repoData', allTask)

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

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
          refetch={refetch}
        />
        {reqs.map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              {...item}
              refetch={refetch}
            />)
          else return (<TimerPlus
            key={idx}
            {...item}
            refetch={refetch}
          />)
        })
        }
      </div>
    </React.Fragment>

  );
}

export default App;
