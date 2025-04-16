import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
