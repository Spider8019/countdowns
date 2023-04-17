import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setFormat } from '../../redux/slices/global';
import FormInput from '../FormInput';

const Navbar = ({ visibleBottom, setVisibleBottom }) => {
    const { global } = useSelector(state => state)
    const dispatch = useDispatch();
    return (
        <div className='p-2 bg-black text-white flex items-center   justify-between'>
            <p
                style={{ fontFamily: "Kanit", fontWeight: 600 }}
                className='text-xl'
            >CDs</p>
            <div className='flex gap-4'>
                <i className='text-white pi pi-sliders-h' onClick={() => { if (global.format === 'seconds') dispatch(setFormat({ format: 'hours' })); else dispatch(setFormat({ format: 'seconds' })) }} />
                <i className='text-white pi pi-plus' onClick={() => setVisibleBottom(!visibleBottom)} />
            </div>
            <FormInput
                visibleBottom={visibleBottom}
                setVisibleBottom={setVisibleBottom}
            />
        </div>
    )
}

export default Navbar