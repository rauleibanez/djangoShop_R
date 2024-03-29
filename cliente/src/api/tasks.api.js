import axios from 'axios';
/* ------------------------------------------
 * Función que establece la conexion con las 
 * APIs del BackEnd 
 * ------------------------------------------
 */

const tasksApi = axios.create({
	baseURL:'http://localhost:8000/tasks/api/v1/tasks/',
});

export const getAllTasks = () => {
	/*return axios.get('http://localhost:8000/tasks/api/v1/tasks/')*/
	return tasksApi.get('/');
}

export const getTask = (id) => tasksApi.get(`/${id}/`)

export const createTask=(task) => {
	return tasksApi.post('/', task);	
}

export const deleteTask = (id) => tasksApi.delete(`/${id}`)

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task)