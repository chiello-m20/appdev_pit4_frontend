import React, { useEffect, useState } from 'react';
import './index.css';

const API_URL = 'http://localhost:8000/tasks/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleAddOrEditTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    if (editingTaskId) {
      // Update task
      await fetch(`${API_URL}${editingTaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskTitle })
      });
      setEditingTaskId(null);
    } else {
      // Add new task
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskTitle })
      });
    }

    setTaskTitle('');
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await fetch(`${API_URL}${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const handleToggleTask = async (task) => {
    await fetch(`${API_URL}${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, completed: !task.completed })
    });
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setTaskTitle(task.title);
    setEditingTaskId(task.id);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container">
      <div className="dark-toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <h1>To-Do List</h1>

      <form onSubmit={handleAddOrEditTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="submit">
          {editingTaskId ? 'Update' : 'Add'}
        </button>
      </form>

      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <div className="task-title">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.title}
              </span>
            </div>
            <div className="actions">
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
