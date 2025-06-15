import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"


function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuth();
  console.log(loading, isAuthenticated)

  if(loading) return <h1>Loading...</h1>

  if(!loading && !isAuthenticated) return <Navigate to='/login' replace /> //"replace", es para que no vuelva a la ruta anterior, sino que se sobreescriba y quede la ruta '/login'.
  return (
    <Outlet /> //Sirve para decirle que continue con los componentes que tiene adentro; digo adentro, porque en './App.js' esta función "ProtectedRoute()" se usa dentro de una ruta, como un componente que engloba a otras rutas que llaman a otros componentes.
  )
}

export default ProtectedRoute