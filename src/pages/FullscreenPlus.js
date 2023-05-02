import { recreateTask } from '../api';
import { useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { Button } from 'primereact/button';
import { Chart } from "react-google-charts";
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';

const FullscreenPlus = () => {
  // const [value, setValue] = useState(Date.now());
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const secondsLeftRef = useRef(null)
  const [data] = useSelector(state => state.timers.timers.filter(item => item._id === searchParams.get('_id')))
  const secondsLeft = Math.ceil((Date.now() - data.date[data.date.length - 1]) / 1000);
  const [timeWeHave, setTimeWeHave] = useState(secondsLeft);

  useEffect(() => {
    secondsLeftRef.current = setInterval(() => {
      setTimeWeHave((timeWeHave) => {
        if (timeWeHave >= 1) return timeWeHave + 1;
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(secondsLeftRef.current);
    };
  }, []);

  const { mutate, isLoading } = useMutation(recreateTask, {
    onSuccess: data => {
      console.log(data);
      navigate("/");
      // refetch();
    },
    onError: () => {
      alert("there was an error")
    }
  });

  const options = {
    title: "Seconds",
    curveType: "function",
    legend: { position: "none" },
    backgroundColor: {
      fill: "transparent"
    },
    hAxis: {
      textStyle: { color: '#FFF' }
    },
    vAxis: {
      textStyle: { color: "#fff" },

    },
    titleTextStyle: {
      color: "#fff"
    },
    legendTextStyle: {
      color: "#fff"
    },
    series: {
      0: { color: '#000' },
      1: { color: '#ff0084' },
    },
    bar: { groupWidth: '100%' },
  };
  return (
    <div className=' grid place-items-center gap-8 justify-center items-center'
      style={{ height: "calc(100vh - 44px)" }}
    >
      <div>
        <div
          className='mx-auto grid place-items-center'
        >
          <Chart
            options={options}
            chartType="ColumnChart"
            width="400px"
            height="400px"
            data={[["I", "II", { role: "style" }], ...data.date.slice(0, -1).map((item, idx) => { return [idx, item, "#33ff14"] }), [data.date.length-1, timeWeHave, "#33ff14"]]} />
        </div>
        <div className='text-center text-white'>
          <p className='text-3xl font-semibold'>{data.title}</p>
          <p className='sm:text-5xl text-[#33ff14] text-xl w-screen'>{timeWeHave} <i className="pi pi-arrow-right-arrow-left"></i> {("0" + Math.floor(timeWeHave / (3600 * 24)).toString()).slice(-2)}:{("0" + Math.floor(timeWeHave % (3600 * 24) / 3600)).toString().slice(-2)}:{("0" + Math.floor(timeWeHave % 3600 / 60).toString()).slice(-2)}:{("0" + Math.floor(timeWeHave % 60).toString()).slice(-2)}</p>
        </div>
        <div className='flex justify-center gap-4 mt-4'>
          <Button
            loading={isLoading}
            onClick={() => mutate({
              id: data._id,
              timeWeHave: timeWeHave
            })}
            label="Recreate" />
        </div>
      </div>
    </div>
  )
}

export default FullscreenPlus