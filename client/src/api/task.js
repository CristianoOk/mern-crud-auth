import axios from './axios'

export const getTasksRequest = () => axios.get('/tasks')

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`)

export const createTasksRequest = (task) => axios.post('/tasks', task)

export const updateTasksRequest = (id, task) => axios.put(`/tasks/${id}`, task) //"axios.put(`/tasks/${id}`, task)", lo que le envío es el "task" ("`, task)").

export const deleteTasksRequest = (id) => axios.delete(`/tasks/${id}`)

