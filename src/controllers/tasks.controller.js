import Task from '../modules/task.model.js'

export const getTasks = async (req, res) => {
	const tasks = await Task.find({ //Le digo que busque las tareas que cumplan con lo que está acá, entre llaves "{}", y que lo guarde en "const tasks".
		user: req.user.id
	}).populate('user') //Le digo que en vez de devolverme solo el id del "user" ("user: req.user.id"), busque la consulta del usuario y traiga todos sus datos.
	res.json(tasks)
};

export const createTask = async (req, res) => {
	const {title, description, date} = req.body;

	const newTask = new Task({
		title,
		description,
		date,
		user: req.user.id
	});
	const savedTask = await newTask.save();
	res.json(savedTask);
};

export const getTask = async (req, res) => {
	try {
    const task = await Task.findById(req.params.id).populate('user')
	  if(!task) return res.status(404).json({message: "Task not found"})
	  res.json(task)
  } catch (error) {
    return res.status(404).json({message: "Task not found"}); //Es importante tener try-catch, ya que, si llega a haber un error y no se contempla dicha posibilidad y como manejarlo (en este caso le digo que lo maneje mostrando un mensaje) => deja de funcionar el backEnd, mietras que con esto le decimos que al producirse muestre un mensaje, pero sin dejar de funcionar. O sea, básicamente manejo el error y no dejo que me tumbe el proceso.
  }
};

export const deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id)
	if(!task) return res.status(404).json({message: "Task not found"})
	return res.sendStatus(204)
};

export const updateTask = async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}) //"req.body", son los nuevos datos actualizados. "{new: true}", sirve para que dentro de "const task" se guarden los datos nuevos.
	if(!task) return res.status(404).json({message: "Task not found"})
	res.json(task)
};