import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { addTask } from '../api'
import { useMutation } from 'react-query'
import { Button } from 'primereact/button'
import { useSelector } from 'react-redux'

const FormInput = ({ visibleBottom, setVisibleBottom }) => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(Date.now())
  const [type, setType] = useState('+')
  const [checked, setChecked] = useState(true)

  const {global:{userId}}=useSelector(state=>state)
  const { mutate, isLoading } = useMutation(addTask, {
    onSuccess: (data) => {
      setVisibleBottom(false)
      window.location.reload()
      // refetch();
    },
    onError: () => {
      setVisibleBottom(false)
      alert('there was an error')
    },
  })
console.log("forminpur"+userId)
  return (
    <Sidebar
      blockScroll={true}
      visible={visibleBottom}
      position="bottom"
      onHide={() => setVisibleBottom(false)}
    >
      <form>
        <label className="items-center flex gap-8 my-1">
          <p className="w-[60px]">Title:</p>
          <input
            type="text"
            className="w-full standardInput"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="items-center flex gap-8 my-1">
          <p className="w-[60px]">Date:</p>
          <input
            type="datetime-local"
            className="w-full standardInput"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label className="items-center flex gap-8 my-1 mb-4">
          <p className="w-[60px]">Types:</p>
          <select
            name="type"
            className="w-full standardInput"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
          </select>
        </label>
        <label className="items-center flex gap-8 my-1 mb-4">
          <p className="w-[60px]">Public:</p>
          <div
            onClick={() => setChecked(!checked)}
            className={` ${
              !checked ? 'bg-red-800' : 'bg-[#47823e]'
            } text-white w-full standardInput`}
          >
            {checked ? 'Yes' : 'No'}
            {' - Click to toggle'}
          </div>
        </label>
        <Button
          loading={isLoading}
          className="bg-red-800 w-full p-2 mt-4"
          onClick={() =>
            mutate({
              title,
              date: [new Date(date).getTime()],
              type,
              checked,
              createdBy:userId
              // publicTimer: checked
            })
          }
          label="Submit"
        />
      </form>
      {/* </div> */}
    </Sidebar>
  )
}

export default FormInput
