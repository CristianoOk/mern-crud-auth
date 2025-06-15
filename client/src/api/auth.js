import axios from './axios.js' //"./axios.js", fijate se esta importando desde un archivo .js que yo cree, no de la biblioteca "axios".

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify')