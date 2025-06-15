import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
import dayjs from "dayjs"; //Para poder hacer esta importación, previamente en la terminal instalé "npm i dayjs". //Importo la propia biblioteca "dayjs", con el nombre de "dayjs" (la hubiera podido traer con cualquier otro nombre).
import utc from 'dayjs/plugin/utc'; //Para poder hacer esta importación, previamente en la terminal instalé "npm i dayjs".
dayjs.extend(utc)

function TaskFormPage() {
  const {register, handleSubmit, setValue} = useForm(); //Lo que está entre llaves, son 'funciones' que vienen gracias al "useForm()". Entre otras que seguro tiene, yo únicamente estoy llamando a estas.
  const {createTask, getTask, updateTask} = useTasks()
  //console.log(createTask())
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if(params.id) {
        const task = await getTask(params.id);
        getTask(task)
        setValue('title', task.title) //Le digo que establezca en el "title", lo que viene de "task.title".
        setValue('description', task.description)
        console.log(dayjs(task.date).utc().format('DD/MM/YYYY'))
        setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, [])

  const onSubmit = handleSubmit((data) => {

    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    // //console.log(data);
    // if(params.id) {
    //   updateTask({
    //     ...data, 
    //     date: dayjs.utc(data.date).format(),
    //   });
    // } else {
    //   createTask({
    //     ...data, 
    //     date: dayjs.utc(data.date). format()
    //   })
    // }
    navigate('/tasks');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div>
        <form onSubmit={onSubmit} className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <label htmlFor="title">title</label>
          <input type="text" placeholder="Title" {...register("title")} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" autoFocus />
          <label htmlFor="description">description</label>
          <textarea rows="3" placeholder="Description" {...register("description")} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"></textarea>
  
          <label htmlFor="date">Date</label>
          <input type="date" {...register('date')} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage