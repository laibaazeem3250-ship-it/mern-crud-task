import { useEffect, useState, useCallback } from "react";
import api from "./api/axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/");
      setTasks(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not connect to the server. Is the backend running?"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // CREATE — insert new task into state immediately for a real-time feel
  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      const res = await api.post("/", payload);
      setTasks((prev) => [res.data.data, ...prev]);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Could not create task.");
    } finally {
      setSubmitting(false);
    }
  };

  // UPDATE — patch the single task in state with the server's response
  const handleUpdate = async (id, payload) => {
    try {
      const res = await api.put(`/${id}`, payload);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Could not update task.");
    }
  };

  // DELETE — remove the task from state
  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Could not delete task.");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">MERN Stack CRUD — React + Express + MongoDB</p>
      </header>

      <main>
        <TaskForm onCreate={handleCreate} submitting={submitting} />

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={fetchTasks}>Retry</button>
          </div>
        )}

        {loading ? (
          <p className="loading-state">Loading tasks...</p>
        ) : (
          <>
            {tasks.length > 0 && (
              <p className="task-count">
                {completedCount} of {tasks.length} completed
              </p>
            )}
            <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
