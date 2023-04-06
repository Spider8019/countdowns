import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Timer from "./components/Timer"
import TimerPlus from './components/TimerPlus';
import FormInput from './components/FormInput';
import { allTask } from './api';
import Navbar from './components/global/Navbar';
import { useQuery } from 'react-query';
import { ProgressBar } from 'primereact/progressbar';
import axios from 'axios';

function App() {
  const constraintsRef = useRef(null);
  const [visibleBottom, setVisibleBottom] = useState(false);

  const { isLoading, error, data: reqs, refetch } = useQuery('repoData', allTask)
  useEffect(() => {
    axios.get("https://api.ipify.org/?format=json").then(data => { console.log(data); return data.data }).catch(err => { return err })
  }, [])
  if (isLoading) return <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>

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
        {[...reqs.yourTasks, ...reqs.publicTasks].map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              {...item}
              publicAccess={idx >= reqs.yourTasks.length}
              refetch={refetch}
            />)
          else return (<TimerPlus
            key={idx}
            {...item}
            publicAccess={idx >= reqs.yourTasks.length}
            refetch={refetch}
          />)
        })
        }
      </div>
    </React.Fragment>

  );
}

export default App;
