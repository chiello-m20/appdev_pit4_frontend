export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
    return (
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded shadow">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, !task.completed)}
              />
              <span className={task.completed ? 'line-through text-gray-400' : ''}>{task.title}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(task.id)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  