import axios from 'axios';

const tasksApi = axios.create({
	baseURL:'http://localhost:8000/tasks/api/v1/tasks/',
});

export const getAllTasks = () => {
	/*return axios.get('http://localhost:8000/tasks/api/v1/tasks/')*/
	return tasksApi.get('/');
}

export const createTask=(task) => {
	return tasksApi.post('/', task);
	
}