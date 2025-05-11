import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // for edit mode

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskSaved = () => {
    fetchTasks();        // Refresh task list
    setSelectedTask(null); // Reset form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Task Manager</h1>

      <TaskForm task={selectedTask} onTaskSaved={handleTaskSaved} />

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Task List</h2>
      
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between">
            <div>
              <strong className="text-xl text-gray-900">{task.title}</strong>
              <p className="text-sm text-gray-500">{task.status}</p>
              <p className="text-gray-700 mt-2">{task.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEdit(task)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskManager;
