import { useForm } from "react-hook-form"; //Tuve que instalar "npm i react-hook-form".
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {

	const {register, handleSubmit, formState: {errors}} = useForm();
	const {signup, isAuthenticated, errors: registerErrors} = useAuth(); //"errors: RegisterErrors", estoy renombrando "errors" a "registerErrors", para que no haya problemas con el "erros" de "useForm()" (formState: {errors}).
  const navigate = useNavigate(); //Sirve para navegar entre páginas.

	useEffect(() => {
    if(isAuthenticated) navigate("/tasks") //Si "sAuthenticated" tiene valor 'true' => le digo que navegue a la ruta de "/tasks".
  }, [isAuthenticated])

	const onSubmit = handleSubmit(async (values) => {
		signup(values);
	});

  return (
	<div className="flex h-[clac(100vh-100)] items-center justify-center">
		
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (<div className="bg-red-500 p-2 text-white" key={i}>{error}</div>))}
      <h1 className="text-3xl font-bold my-2">Register</h1>
			<form onSubmit={onSubmit}>
      
				<input type="text" {...register("username", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Username" />
        {errors.username && <p className="text-red-500">Username is required</p>}

				<input type="email" {...register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Email" />
        {errors.email && <p className="text-red-500">Email is required</p>}

				<input type="password" {...register("password", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder="Password" />
        {errors.password && <p className="text-red-500">Password is required</p>}

				<button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md my-2">Register</button>
			</form>

			<p className="flex gap-x-2 justify-between">Already have an account? <Link to="/login" className="text-sky-500">Sign up</Link></p>
		</div>
	</div>
  )
}

export default RegisterPage