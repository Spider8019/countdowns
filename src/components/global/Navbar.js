import React from 'react'
import { Button } from 'primereact/button'

const Navbar = ({visibleBottom,setVisibleBottom}) => {
    return (
        <div className='p-2 bg-black text-white flex items-center   justify-between'>
            <p
            style={{fontFamily:"Kanit",fontWeight:600}}
            className='text-xl'
            >CDs</p>
            <i className='text-white pi pi-plus' onClick={() => setVisibleBottom(!visibleBottom)} />
        </div>
    )
}

export default Navbar