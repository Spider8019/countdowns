import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFormat } from '../../redux/slices/global'
import FormInput from '../FormInput'
import { useAuth0 } from '@auth0/auth0-react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import Profile from '../cards/Profile'
import { Divider } from 'primereact/divider'
import { isTokenExpired } from '../../tools'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { logoutUser } from '../../api'
import { removeAccessToken } from '../../redux/slices/global'

const Navbar = ({ visibleBottom, setVisibleBottom }) => {
  const [visible, setVisible] = useState(false)
  const { data, isLoading, mutate } = useMutation(logoutUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    global: { accessToken, userPhoneNumber },
  } = useSelector((state) => state)
  const handleLogout = async (e) => {
    e.preventDefault()
    mutate(
      {},
      {
        onSuccess: (data) => {
          console.log(data)
          dispatch(removeAccessToken({}))
          navigate('/login')
        },
      },
    )
  }

  return (
    <>
      <div className="card flex justify-content-center">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div>
            {accessToken === null ||
            (accessToken != null && isTokenExpired(accessToken)) ? (
              <Button
                icon="pi pi-arrow-right"
                label="Login"
                onClick={() => navigate('/login')}
              />
            ) : (
              <>
                <p className="text-2xl font-semibold">{userPhoneNumber}</p>
                <Divider />
                <div className="flex-col gap-20 text-sm">
                  <p
                    className="text-white"
                    onClick={() => {
                      navigate('/')
                      setVisible(false)
                    }}
                  >
                    Home
                  </p>
                  <p
                    className="text-white"
                    onClick={() => {
                      navigate('/profile')
                      setVisible(false)
                    }}
                  >
                    Profile
                  </p>
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
                      setVisible(false)
                    }}
                  >
                    Change Format
                  </p>
                </div>
                <Divider />
                <Button
                  icon="text-white pi pi-globe"
                  label="Logout"
                  onClick={handleLogout}
                />
              </>
            )}
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
