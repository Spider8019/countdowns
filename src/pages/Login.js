import React, { useState } from 'react'
import { loginUser } from '../api'
import { useMutation } from 'react-query'
import { Button } from 'primereact/button'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../redux/slices/global'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const { data, isLoading, mutate } = useMutation(loginUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    mutate(
      {
        userPhoneNumber,
        password,
      },
      {
        onSuccess: (data) => {
          console.log(data)
          dispatch(
            setAccessToken({
              accessToken: data.token,
              userPhoneNumber: data.userPhoneNumber,
              userId:data.userId
            }),
          )
          navigate('/profile')
        },
      },
    )
  }

  return (
    <div>
      <div
        className="grid place-items-center"
        style={{ height: 'calc(100vh - 44px)' }}
      >
        <form onSubmit={handleLogin} className="bg-black p-4 rounded-xl m-4">
          <input
            className="w-full text-white my-2 rounded-xl p-2 border-white border-2 bg-transparent"
            type="tel"
            placeholder="Phone Number"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
          />
          <input
            className="w-full text-white my-2 rounded-xl p-2 border-white border-2 bg-transparent"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            label={!isLoading ? 'Login' : '...'}
            type="submit"
            disabled={isLoading}
            className="w-full bg-white my-2 p-2 rounded-xl"
          />
        </form>
      </div>
    </div>
  )
}

export default Login
