import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddTask = () => {
    if (!task || !priority || !startDate || !dueDate || !status) return;

    if (editId) {
      
      setTasks(
        tasks.map((t) =>
          t.id === editId
            ? { ...t, task, priority, startDate, dueDate, status }
            : t
        )
      );
      setEditId(null);
    } else {
    
      const newTask = {
        id: Date.now(),
        task,
        priority,
        startDate,
        dueDate,
        status,
      };
      setTasks([...tasks, newTask]);
    }

    
    setTask("");
    setPriority("");
    setStartDate("");
    setDueDate("");
    setStatus("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (id) => {
    const t = tasks.find((task) => task.id === id);
    setTask(t.task);
    setPriority(t.priority);
    setStartDate(t.startDate);
    setDueDate(t.dueDate);
    setStatus(t.status);
    setEditId(id);
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1 className="title">Todo List</h1>

        
        <div className="form-row">
          <input
            type="text"
            placeholder="Task Name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleAddTask}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

  
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.task}</td>
                <td>{t.startDate}</td>
                <td>{t.dueDate}</td>
                <td>{t.priority}</td>
                <td>{t.status}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(t.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan="6" className="empty">
                  No tasks yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
