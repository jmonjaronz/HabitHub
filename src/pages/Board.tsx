import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'in-review' | 'done';
}

const initialTasks: Task[] = [
  { id: 1, title: 'Task 1', status: 'todo' },
  { id: 2, title: 'Task 2', status: 'in-progress' },
  { id: 3, title: 'Task 3', status: 'in-review' },
  { id: 4, title: 'Task 4', status: 'done' },
  { id: 5, title: 'Task 5', status: 'todo' },
  { id: 6, title: 'Task 6', status: 'in-progress' },
  { id: 7, title: 'Task 7', status: 'in-review' },
  { id: 8, title: 'Task 8', status: 'done' },
  // Agrega más tareas aquí
];

const Board = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const countTasks = (status: Task['status']) =>
    tasks.filter((task) => task.status === status).length;

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-6">Tasks Board</h1>
      <div className="flex space-x-4">
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">To Do ({countTasks('todo')})</h2>
          {tasks.filter((task) => task.status === 'todo').map((task) => (
            <div key={task.id} className="bg-white p-4 mb-2 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <button
                onClick={() => moveTask(task.id, 'in-progress')}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Move to In Progress
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">In Progress ({countTasks('in-progress')})</h2>
          {tasks.filter((task) => task.status === 'in-progress').map((task) => (
            <div key={task.id} className="bg-white p-4 mb-2 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <button
                onClick={() => moveTask(task.id, 'in-review')}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Move to In Review
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">In Review ({countTasks('in-review')})</h2>
          {tasks.filter((task) => task.status === 'in-review').map((task) => (
            <div key={task.id} className="bg-white p-4 mb-2 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <button
                onClick={() => moveTask(task.id, 'done')}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Move to Done
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/4 bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Done ({countTasks('done')})</h2>
          {tasks.filter((task) => task.status === 'done').map((task) => (
            <div key={task.id} className="bg-white p-4 mb-2 rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              {/* Opcional: botón para mover de nuevo a otro estado */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;