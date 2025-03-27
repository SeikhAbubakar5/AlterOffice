import React, { useState } from "react";
import "./Todotask.css";

const Todotask = ({ taskList, setTaskList }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({});
  const [showActions, setShowActions] = useState(null);

  // Handle delete task
  const handleDelete = (index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowActions(null);
  };

  // Handle update task
  const handleUpdate = (index) => {
    setEditIndex(index);
    setUpdatedTask(taskList[index]);
    setShowActions(null);
  };


  const handleSave = () => {
    const updatedTasks = [...taskList];
    updatedTasks[editIndex] = updatedTask;
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setEditIndex(null);
  };

  return (
    <div className="todoContainer">
      <div className="taskList">
        {taskList && taskList.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          taskList.map((task, index) => (
            <div key={index} className="taskItem">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={updatedTask.title}
                    onChange={(e) =>
                      setUpdatedTask({ ...updatedTask, title: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    value={updatedTask.dueDate}
                    onChange={(e) =>
                      setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                    }
                  />
                  <select
                    value={updatedTask.status}
                    onChange={(e) =>
                      setUpdatedTask({ ...updatedTask, status: e.target.value })
                    }
                  >
                    <option value="TO-DO">TO-DO</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <select
                    value={updatedTask.category}
                    onChange={(e) =>
                      setUpdatedTask({ ...updatedTask, category: e.target.value })
                    }
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                  </select>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>{task.title}</p>
                  <p>{task.dueDate || "No Date"}</p>
                  <p>{task.status}</p>
                  <p>{task.category}</p>
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowActions(showActions === index ? null : index)}
                  >
                    ...
                  </p>
                  {showActions === index && (
                    <div className="actionButtons">
                      <button onClick={() => handleUpdate(index)}>Update</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todotask;
