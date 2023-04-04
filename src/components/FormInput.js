import React, { useState } from 'react'
import axios from "axios"
import { Sidebar } from 'primereact/sidebar';

const FormInput = ({ visibleBottom, setVisibleBottom }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(Date.now());
    const [type, setType] = useState("+");


    const addTask = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/addtask/", {
            title, date: new Date(date).getTime(), type
        }).then(function (response) {
            console.log(response);
            window.location.reload();
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Sidebar visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)}>
            {/* <div className='bg-gray-200 p-4 rounded'> */}
            <form>
                <label className='flex gap-8 my-1'>
                    <p className='w-[60px]'>
                        Title:
                    </p>
                    <input
                        type="text"
                        className='w-full standardInput'
                        value={title}
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className='flex gap-8 my-1'>
                    <p className='w-[60px]'>
                        Date:
                    </p>
                    <input
                        type="datetime-local"
                        className='w-full standardInput'
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label className='flex gap-8 my-1'>
                    <p className='w-[60px]'>
                        Types:
                    </p>
                    <select
                        name="type"
                        className='w-full standardInput'
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </select>
                </label>
                <input
                    className='bg-red-500 w-full p-2 mt-2 rounded'
                    onClick={addTask}
                    type="submit" />
            </form>
            {/* </div> */}
        </Sidebar>
    )
}

export default FormInput