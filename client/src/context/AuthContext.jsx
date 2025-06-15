import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);


  const signup = async (user) => {

    try {
      const res = await registerRequest(user);
		console.log(res.data);
    setUser(res.data)
    setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response)
      setErrors(error.response.data)
    }
  }

    /*Esto solo lo usé para ver el error que me salía.
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error('Error during registration:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }*/
    //console.log(user);
		
    const signin = async (user) =>{
    try {
      const res = await loginRequest(user)
      console.log(res)
      setIsAuthenticated(true);
      setUser(res.data)
    } catch (error) {
      if(Array.isArray(error.response.data)) { //Le digo que si "error.response.data", es un arreglo/array (porque puede ser un objeto, por ejemplo) => que continue.
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message]) //Si no cumple el "if" => le digo que cree un arrego y adentro coloque el error que está recibiendo, más precisamente el mensaje de dicho error (esto, ya que, es un objeto (porque el "if" contemplaba la posibilidad de que fuera un array => si se llega a ejecutar esta linea means que no es un array, por eso no entró al "if" y => es un objeto) => llamo a "message" como una propiedad).
    }
  }

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if(errors.length > 0) {
      const timer = setTimeout(() => {setErrors([])}, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if(!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return //setUser(null)
      }
    
    try {
      const res = await verifyTokenRequest(cookies.token)
      if(!res.data) {
        setIsAuthenticated(false)
        setLoading(false)
        return;
      }
      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setIsAuthenticated(false)
      setUser(null)
      setLoading(false)
    }
    
    }
    checkLogin();
  }, []) //Cree todo esto, ya que, la función del "useEffect" no puede ser asincrónica => de esta forma hago que llame a otra función que si lo es.

  return (
    <AuthContext.Provider value={{signup, signin, logout, loading, user, isAuthenticated, errors}}>{children}</AuthContext.Provider>
  )
}