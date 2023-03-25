import './App.css';
import { useRef,useState } from 'react';
import Timer from "./components/Timer"
function App() {
  const constraintsRef = useRef(null);
  const [reqs, setReqs] = useState([{
    title: "Carbonated Drink's Break till",
    date: new Date("2023-09-21"),
    // clockColor:"red"
  },{
    title: "New year 2024",
    date: new Date("2024-01-01"),
    clockColor:"yellow"
  },{
    title: "Carbonated Drink's Break till",
    date: new Date("2023-09-21"),
    clockColor:"orange"
  }])
  return (
    <div className="App"
      ref={constraintsRef}
    >{
        reqs.map((item, idx) => {
          return (<Timer
            key={idx}
            title={item.title}
            date={item.date}
            clockColor={item.clockColor}
            constraintsRef={constraintsRef}
          />)

        })
      }
    </div>
  );
}

export default App;
