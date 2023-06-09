import React from 'react'
import { ProgressBar } from 'primereact/progressbar'

const DefaultLoader = () => {
  return (
    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
  )
}

export default DefaultLoader