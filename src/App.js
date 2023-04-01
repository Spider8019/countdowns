import './App.css';
import { useRef, useState } from 'react';
import Timer from "./components/Timer"
import TimerPlus from './components/TimerPlus';
function App() {
  const constraintsRef = useRef(null);
  const [reqs, setReqs] = useState([{
    title: "Carbonated Drink's Break till",
    date: new Date("2023-09-21"),
    type: "-"
    // clockColor:"red"
  }, {
    title: "New year 2024",
    date: new Date("2024-01-01"),
    type: "-"
  }, {
    title: "Masturbated Last Time",
    date: new Date("2023-04-01"),
    type: "+"
  },{
    title: "Carbonated Drink's Break till",
    date: new Date("2023-09-21"),
    type: "-"
    // clockColor:"red"
  }, {
    title: "New year 2024",
    date: new Date("2024-01-01"),
    type: "-"
  }, {
    title: "Masturbated Last Time",
    date: new Date("2023-04-01"),
    type: "+"
  }])
  return (
    <div className="App"
      ref={constraintsRef}
    >{
        reqs.map((item, idx) => {
          if (item.type === "-")
            return (<Timer
              key={idx}
              title={item.title}
              date={item.date}
              clockColor={item.clockColor}
            />)
          else return (<TimerPlus
            key={idx}
            title={item.title}
            date={item.date}
            clockColor={item.clockColor}
          />)


        })
      }
    </div>
  );
}

export default App;
