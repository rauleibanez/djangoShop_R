import {useNavigate} from "react-router-dom"
/* -----------------------------------------
 * Componente que coloca cada elemento de la 
 * lista del componente TaskList en un Card 
 * -----------------------------------------
 */
export function TaskCard({ task }) {
	const navigate = useNavigate()
	return (
		<div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
		onClick={()=>{
			navigate('/tasks/' + task.id)
		}}>
			<h2 className="font-bold uppercase">{task.title}</h2>
			<p className="text-slate-400">{task.description}</p>
		</div>		
	);
} 