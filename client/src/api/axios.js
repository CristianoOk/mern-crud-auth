import axios from "axios"; //Para esta importación previo instalé en el terminal "npm i axios".

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true
})

export default instance