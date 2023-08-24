import axios from 'axios'
import { defaults } from './defaultValues'

const callApiAndReturnDataGet = async (DATA, URL) => {
  const response = await axios({
    method: 'GET',
    url: defaults.baseBackendUrl + URL,
    params: DATA,
  })
  if (response.status === 200) return response.data
  else {
    return { error: 'Unable To Fetch', ...response }
  }
}

const callApiAndReturnDataPost = async (DATA, URL) => {
  const response = await axios({
    method: 'POST',
    url: defaults.baseBackendUrl + URL,
    data: DATA,
  })
  if (response.status === 200) return response.data
  else {
    return { ...response }
  }
}

const callApiAndReturnDataDlt = async (DATA, URL) => {
  const response = await axios({
    method: 'DELETE',
    url: defaults.baseBackendUrl + URL,
    data: DATA,
  })
  if (response.status === 200) return response.data
  else {
    return { ...response }
  }
}

export const addTask = (obj) => callApiAndReturnDataPost(obj, 'addtask/')
export const allTask = (obj) => callApiAndReturnDataGet(obj, 'alltask/')
export const allTaskByYou = (obj) =>
  callApiAndReturnDataGet(obj, 'alltaskbyyou/')
export const subscribeTask = (obj) =>
  callApiAndReturnDataPost(obj, 'subscribetask/')
export const deleteTask = (obj) => callApiAndReturnDataDlt(obj, 'deletetask/')
export const loginUser = (obj) => callApiAndReturnDataPost(obj, 'login/')
export const logoutUser = (obj) => callApiAndReturnDataPost(obj, 'logout/')
export const recreateTask = (obj) =>
  callApiAndReturnDataPost(obj, 'recreatetask/')
