import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TimerThunks } from '../redux/thunks/timer'
import { ProgressBar } from 'primereact/progressbar'
import TimerPlus from '../components/TimerPlus'
import Timer from '../components/Timer'
import { Divider } from 'primereact/divider'

const Profile = () => {
  const {
    global: { userPhoneNumber, format },
    timers,
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      TimerThunks.getYourPersonalTimers({ phoneNumber: userPhoneNumber }),
    )
  }, [])

  if (timers.isLoading)
    return (
      <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
    )

  return (
    <div>
      <div className="m-4 text-center">
        Profile
        <p className="text-3xl">{userPhoneNumber}</p>
      </div>
      <Divider />
      <div className="App mt-2 px-2">
        {[...timers.timers].length > 0 &&
          [...timers.timers]
            .sort(function (a, b) {
              return a.date - b.date
            })
            .map((item, idx) => {
              if (item.type === '-')
                return <Timer key={idx} index={idx} {...item} format={format} />
              else
                return (
                  <TimerPlus index={idx} key={idx} {...item} format={format} />
                )
            })}
      </div>
    </div>
  )
}

export default Profile
