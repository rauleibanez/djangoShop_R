import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api';
import {useNavigate, useParams} from "react-router-dom";
import {toast} from 'react-hot-toast';

export function TaskFormPage() {
	const { register, handleSubmit, formState: { errors }, setValue } = useForm();
	
	const navigate = useNavigate();
	const params = useParams();
	/* -----------------------------------------
	 * Manejador del Evento Submit del boton del
     * formulario
     * Si al formulario le llega un parametro id
     * que contenga un valor lo toma como edición
     * de lo contrario lo toma como una adición
     * -----------------------------------------   	 
	 */
	const onSubmit = handleSubmit(async data => {
		if (params.id) {
			await updateTask(params.id, data);
			/* --------------------------------------
			 * Globo de notificaciones personalizado
			 * --------------------------------------
			 */
			toast.success('Tarea Actualizada', {
				position: "botton-rigth",
				style: {
					background: "#101010",
					color: "#fff",
				},
			});
		} else {
			await createTask(data);
			/* ------------------------------
			 * Globo de Notificaciones normal
			 * ------------------------------			 
			 */ 
			toast.success('Tarea Creada');
		}
		navigate('/tasks');
	})
	/* -----------------------------------------
	 * Manejador de la carga de datos desde el
	 * componente TaskList se crea una funcion 
	 * loadTask para poder asignarle un async
	 * await y devolver los datos del BackEnd
	 * -----------------------------------------
	 */
	useEffect(() => {
		async function loadTask() {
			if (params.id) {
				const res = await getTask(params.id);
				setValue('title', res.data.title)
				setValue('description', res.data.description)
			}			
		}
		loadTask();
	},[])
	/* -----------------------------------------
	 * Devuelve el formulario en formato HTML
	 * y el boton que contiene la opcion de 
	 * Eliminación
	 * -----------------------------------------
	 */
	return (
		<div className="max-w-xl mx-auto">
		<h2 className="font-bold uppercase"> Form Page </h2>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="Title"
				{...register("title", { required:true })}
				 className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
				{ errors.title && <spam>Texto Requerido</spam> }
				<textarea rows="3" placeholder="Description"
				{...register("description", { required:true })}
				 className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"></textarea>
				{ errors.description && <spam>Texto Requerido</spam> }
				<button className="bg-indigo-500 p-3 rounded-lg block w-full mb-3">
				Save
				</button>
			</form>
			{params.id && (
			<div className="flex justify-end">
			<button	className="bg-red-500 p-3 rounded-lg w-48 mt-3"
				onClick={async () => {
				const aceptado = window.confirm("Esta seguro?");
				if (aceptado){
					await deleteTask(params.id);
					/* --------------------------------------
					 * Globo de notificaciones personalizado
					 * --------------------------------------
					 */
					 toast.success('Tarea Eliminada', {
						 position: "botton-rigth",
						 style: {
							 background: "#101010",
							 color: "#fff",
						 },
					 });
					// -------------------------------------- 
					navigate('/tasks');
				}
			}}
			>Delete</button>
			</div>
			)}
		</div>
	);
}