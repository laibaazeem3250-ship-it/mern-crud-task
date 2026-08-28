import { useState } from "react";

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [busy, setBusy] = useState(false);
  const [itemError, setItemError] = useState("");

  const handleToggleComplete = async () => {
    setBusy(true);
    setItemError("");
    try {
      await onUpdate(task._id, { completed: !task.completed });
    } catch (err) {
      setItemError(err.message || "Failed to update task.");
    } finally {
      setBusy(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!title.trim()) {
      setItemError("Title cannot be empty.");
      return;
    }
    setBusy(true);
    setItemError("");
    try {
      await onUpdate(task._id, { title: title.trim(), description: description.trim() });
      setIsEditing(false);
    } catch (err) {
      setItemError(err.message || "Failed to save changes.");
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    setItemError("");
    try {
      await onDelete(task._id);
    } catch (err) {
      setItemError(err.message || "Failed to delete task.");
      setBusy(false);
    }
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <div className="form-row">
          <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={busy} />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={busy}
            placeholder="Description"
          />
          <button onClick={handleSaveEdit} disabled={busy}>
            Save
          </button>
          <button
            className="secondary"
            onClick={() => {
              setIsEditing(false);
              setTitle(task.title);
              setDescription(task.description || "");
              setItemError("");
            }}
            disabled={busy}
          >
            Cancel
          </button>
        </div>
        {itemError && <p className="error-text">{itemError}</p>}
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-main">
        <input type="checkbox" checked={task.completed} onChange={handleToggleComplete} disabled={busy} />
        <div className="task-text">
          <span className="task-title">{task.title}</span>
          {task.description && <span className="task-desc">{task.description}</span>}
        </div>
      </div>
      <div className="task-actions">
        <button className="secondary" onClick={() => setIsEditing(true)} disabled={busy}>
          Edit
        </button>
        <button className="danger" onClick={handleDelete} disabled={busy}>
          {busy ? "..." : "Delete"}
        </button>
      </div>
      {itemError && <p className="error-text">{itemError}</p>}
    </li>
  );
}

export default TaskItem;
