import React from 'react'
import { Button } from 'primereact/button'

const Navbar = ({visibleBottom,setVisibleBottom}) => {
    return (
        <div className='p-2 bg-black text-white flex justify-between'>
            <p
            style={{fontFamily:"Kanit",fontWeight:600}}
            className='text-xl'
            >CDs</p>
            <Button icon="pi pi-plus" onClick={() => setVisibleBottom(!visibleBottom)} />
        </div>
    )
}

export default Navbar