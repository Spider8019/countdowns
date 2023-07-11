import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFormat } from '../../redux/slices/global'
import FormInput from '../FormInput'
import { useAuth0 } from '@auth0/auth0-react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import Profile from '../cards/Profile'
import { Divider } from 'primereact/divider'

const Navbar = ({ visibleBottom, setVisibleBottom }) => {
  const [visible, setVisible] = useState(false)
  const { global } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <>
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div>
            {/* {!isAuthenticated ? (
              <Button
                icon="pi pi-arrow-right"
                label="Signin with Google"
                onClick={() => loginWithRedirect({})}
              />
            ) : (
              <> */}
            {/* <Profile />
                <Divider /> */}
            <div className="flex-col gap-20 text-sm mb-8">
              <p
                className="text-white"
                onClick={() => setVisibleBottom(!visibleBottom)}
              >
                Add Task
              </p>
              <FormInput
                visibleBottom={visibleBottom}
                setVisibleBottom={setVisibleBottom}
              />
              <p
                className="text-white "
                onClick={() => {
                  if (global.format === 'seconds')
                    dispatch(setFormat({ format: 'hours' }))
                  else dispatch(setFormat({ format: 'seconds' }))
                }}
              >
                Change Format
              </p>
            </div>
            {/* <Button
              icon="text-white pi pi-globe"
              label="Logout"
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            /> */}
            {/* </>
            )} */}
          </div>
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
