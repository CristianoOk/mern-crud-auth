import { Link } from "react-router-dom"
import { useTasks } from "../context/TasksContext"
import days from "dayjs" //Importo la propia biblioteca "dayjs", con el nombre de "days" (la hubiera podido traer con cualquier otro nombre).
import utc from 'dayjs/plugin/utc'
days.extend(utc)

function TaskCard({task}) {
  //console.log
  const {deleteTask} =useTasks()
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button onClick={() => deleteTask(task._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">delete</button>
          <Link to={`/tasks/${task._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" >edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  )
}

export default TaskCard