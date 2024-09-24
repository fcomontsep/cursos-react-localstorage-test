export const VisibilityControl = ({
	isChecked,
	setShowCompleted,
	cleanTasks,
}) => {
	const handleDelete = () => {
		if (window.confirm("¿Estás seguro de querer eliminar las tareas?")) {
			alert("Tareas eliminadas");
			cleanTasks();
		}
	};

	return (
		<div className="d-flex justify-content-between bg-secondary text-white text-center p-2 border-secondary">
			<div className="form-check form-switch">
				<input
					className="form-check-input"
					type="checkbox"
					checked={isChecked}
					onChange={(e) => setShowCompleted(e.target.checked)}
				/>{" "}
			</div>
			<label>Mostrar tareas listas</label>
			<button onClick={handleDelete} className="btn btn-danger">
				Limpiar
			</button>
		</div>
	);
};
