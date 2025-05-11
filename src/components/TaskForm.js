import { useState, useEffect } from "react";
import axios from "axios";

function TaskForm({ task, onTaskSaved }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [due, setDue] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDesc(task.description || '');
      setDue(task.due_date ? task.due_date.split('T')[0] : '');
    } else {
      setTitle('');
      setDesc('');
      setDue('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Title: title,
      Description: desc,
      Status: task ? task.status : "Pending",
      DueDate: due,
    };

    try {
      if (task) {
        await axios.put(`http://localhost:8080/tasks/${task.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/tasks', payload);
      }

      if (typeof onTaskSaved === 'function') {
        onTaskSaved(); // Refresh list or reset UI
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task Title"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="desc" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
        <input
          id="desc"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Task Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="due" className="block text-gray-700 text-sm font-semibold mb-2">Due Date</label>
        <input
          id="due"
          type="date"
          value={due}
          onChange={e => setDue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
