import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFormat } from '../../redux/slices/global'
import FormInput from '../FormInput'
import { useAuth0 } from '@auth0/auth0-react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'

const Navbar = ({ visibleBottom, setVisibleBottom }) => {
  const [visible, setVisible] = useState(false)
  const { global } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { user, isAuthenticated, loginWithPopup, logout } = useAuth0()

  return (
    <>
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <h2>Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            <Button
              icon="pi pi-arrow-right"
              label="Signin with Google"
              onClick={() => loginWithPopup({})}
            />
            <Button
              icon="text-white pi pi-globe"
              label="Logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            />
            <i
              className="text-white pi pi-plus"
              onClick={() => setVisibleBottom(!visibleBottom)}
            />
            <FormInput
              visibleBottom={visibleBottom}
              setVisibleBottom={setVisibleBottom}
            />
            <i
              className="text-white pi pi-sliders-h"
              onClick={() => {
                if (global.format === 'seconds')
                  dispatch(setFormat({ format: 'hours' }))
                else dispatch(setFormat({ format: 'seconds' }))
              }}
            />
          </p>
        </Sidebar>
      </div>
      <div className="p-2 bg-black text-white flex items-center  justify-between">
        <p style={{ fontFamily: 'Kanit', fontWeight: 600 }} className="text-xl">
          CDs
        </p>
        <div className="flex gap-4">
          <i
            className="text-white pi pi-bars"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
    </>
  )
}

export default Navbar
