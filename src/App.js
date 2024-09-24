import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator.js";
import { TaskTable } from "./components/TaskTable.js";
import { VisibilityControl } from "./components/VisibilityControl.js";
import { Container } from "./components/Container.js";

function App() {
	const [tasksItems, setTasksItems] = useState([]);
	const [showCompleted, setShowCompleted] = useState(false);

	function createNewTask(taskName) {
		if (!tasksItems.find((task) => task.name === taskName)) {
			if(!taskName == '') {
				setTasksItems([...tasksItems, { name: taskName, done: false }]);
			} else {
				alert('La tarea no puede tener el nombre en blanco.')
			}
		} else {
			alert('Ya existe una tarea con este nombre.')
		}
	}

	const toggleTask = (task) => {
		setTasksItems(
			tasksItems.map((t) =>
				t.name == task.name ? { ...t, done: !t.done } : t
			)
		);
	};

	useEffect(() => {
		let data = localStorage.getItem("tasks");
		if (data) {
			setTasksItems(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasksItems));
	}, [tasksItems]);

	const cleanTasks = () => {
		setTasksItems(tasksItems.filter((task) => !task.done));
		setShowCompleted(false);
	};

	return (
		<div className="App">
			<main className="bg-dark vh-100 text-white">
				<Container>
					<TaskCreator createNewTask={createNewTask} />
					<TaskTable tasks={tasksItems} toggleTask={toggleTask} />
					<VisibilityControl
						isChecked={showCompleted}
						setShowCompleted={(checked) =>
							setShowCompleted(checked)
						}
						cleanTasks={cleanTasks}
					/>
					{showCompleted === true && (
						<TaskTable
							tasks={tasksItems}
							toggleTask={toggleTask}
							showCompleted={showCompleted}
						/>
					)}
				</Container>
			</main>
		</div>
	);
}

export default App;
