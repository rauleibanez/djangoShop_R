import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api';
import {useNavigate, useParams} from "react-router-dom";

export function TaskFormPage() {
	const { register, handleSubmit, formState: { errors }, setValue } = useForm();
	
	const navigate = useNavigate();
	const params = useParams();
	
	const onSubmit = handleSubmit(async data => {
		if (params.id) {
			await updateTask(params.id, data);
		} else {
			await createTask(data);
		}
		navigate('/tasks');
	})
	
	useEffect(() => {
		async function loadTask() {
			if (params.id) {
				const res = await getTask(params.id);
				setValue('title', res.data.title)
				setValue('description', res.data.description)
				console.log(res);
			}			
		}
		loadTask();
	},[])
	
	return (
		<div>
		<h2> Form Page </h2>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="Title"
				{...register("title", { required:true })}
				/>
				{ errors.title && <spam>Texto Requerido</spam> }
				<textarea rows="3" placeholder="Description"
				{...register("description", { required:true })}
				></textarea>
				{ errors.description && <spam>Texto Requerido</spam> }
				<button>Save</button>
			</form>
			{params.id && (
			<button	onClick={async () => {
				const aceptado = window.confirm("Esta seguro?");
				if (aceptado){
					await deleteTask(params.id);
					navigate('/tasks');
				}
			}}
			>Delete</button>
			)}
		</div>
	);
}