import React from 'react'

const Navbar = ({visibleBottom,setVisibleBottom,setFormat,format}) => {
    return (
        <div className='p-2 bg-black text-white flex items-center   justify-between'>
            <p
            style={{fontFamily:"Kanit",fontWeight:600}}
            className='text-xl'
            >CDs</p>
            <div className='flex gap-4'>
            <i className='text-white pi pi-sliders-h' onClick={() => {if(format==='seconds') setFormat('hours'); else setFormat('seconds')}} />
            <i className='text-white pi pi-plus' onClick={() => setVisibleBottom(!visibleBottom)} />
            </div>
        </div>
    )
}

export default Navbar