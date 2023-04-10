import React, { useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { addTask } from '../api';
import { useMutation } from 'react-query';
import { Button } from 'primereact/button';

const FormInput = ({ visibleBottom, setVisibleBottom, refetch }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(Date.now());
    const [type, setType] = useState("+");
    const [checked, setChecked] = useState(false)

    const { mutate, isLoading } = useMutation(addTask, {
        onSuccess: data => {
            console.log(data);
            setVisibleBottom(false)
            refetch();
        },
        onError: () => {
            setVisibleBottom(false);
            alert("there was an error")
        }
    });

    return (
        <Sidebar
            blockScroll={true}
            visible={visibleBottom} position="bottom" onHide={() => setVisibleBottom(false)}>
            <form>
                <label className='items-center flex gap-8 my-1'>
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
                <label className='items-center flex gap-8 my-1'>
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
                <label className='items-center flex gap-8 my-1'>
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
                <label className='items-center flex gap-8 my-1 mb-4'>
                    <p className='w-[60px]'>
                        Public:
                    </p>
                    <div
                        onClick={() => setChecked(!checked)}
                        className={` ${!checked ? "bg-red-800" : "bg-[#33ff14]"} text-white w-full standardInput`}>
                        {checked ? "Yes" : "No"}{" - Click to toggle"}
                    </div>
                </label>
                <Button
                    loading={isLoading}
                    className='bg-red-800 w-full p-2 '
                    onClick={() => mutate({
                        title, date: new Date(date).getTime(), type,
                        publicTimer: checked
                    })}
                    label="Submit" />
            </form>
            {/* </div> */}
        </Sidebar>
    )
}

export default FormInput