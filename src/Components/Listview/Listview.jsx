import React, { useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CiCalendar, CiCirclePlus } from "react-icons/ci";
import Enter from "../../assets/enter.svg";
import "./Listview.css";
import Todotask from "../Todotask/Todotask";

const Listview = () => {
  const [show, setShow] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);


  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskList(storedTasks);
  }, []);

  const toggleTaskList = () => setShow((prevShow) => !prevShow);
  const toggleForm = () => setShowForm((prevFormShow) => !prevFormShow);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (taskTitle.trim() !== "" && dueDate && taskStatus && taskCategory) {
      const newTask = {
        title: taskTitle,
        dueDate,
        status: taskStatus,
        category: taskCategory,
      };

      const updatedTasks = [...taskList, newTask];

 
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setTaskList(updatedTasks);

  
      setTaskTitle("");
      setDueDate("");
      setTaskStatus("");
      setTaskCategory("");
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setTaskTitle("");
    setDueDate("");
    setTaskStatus("");
    setTaskCategory("");
    setShowForm(false);
  };

  return (
    <div className="listContainer">
      <div className="horizontalBar"></div>
      <div className="listHeader">
        <p>Task Name</p>
        <p>Due On</p>
        <p>Task Status</p>
        <p>Category</p>
      </div>
      <div className="todoTask">
        <div className="todoHeader">
          <p>Todo</p>
          <h5 onClick={toggleTaskList} style={{ cursor: "pointer" }}>
            {show ? <FaChevronUp /> : <FaChevronDown />}
          </h5>
        </div>
        {show && (
          <div className="taskContainer">
            <div className="createTask">
              <button onClick={toggleForm}>
                <TiPlus /> Add Task
              </button>
            </div>
            <div className="horizontalBar"></div>
            {showForm && (
              <div className="form">
                <form onSubmit={handleAddTask} className="formField">
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                  <div className="calendar-container">
                    <button
                      type="button"
                      className="calendar-button"
                      onClick={() =>
                        document.getElementById("datePicker").showPicker()
                      }
                    >
                      <CiCalendar style={{ cursor: "pointer" }} />
                      <label>Add Date</label>
                    </button>
                    <input
                      type="date"
                      id="datePicker"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="hidden-datepicker"
                      required
                    />
                  </div>
                  <div className="taskStatus">
                    <CiCirclePlus
                      onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                      style={{ cursor: "pointer", height: "30px", width: "30px" }}
                    />
                    {showStatusDropdown && (
                      <select
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        required
                      >
                        <option value="TO-DO">TO-DO</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </div>
                  <div className="taskCategory">
                    <CiCirclePlus
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      style={{ cursor: "pointer", height: "30px", width: "30px" }}
                    />
                    {showCategoryDropdown && (
                      <select
                        value={taskCategory}
                        onChange={(e) => setTaskCategory(e.target.value)}
                        required
                      >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                      </select>
                    )}
                  </div>
                </form>
                <div className="formActions">
                  <button onClick={handleAddTask} className="addBtn" type="submit">
                    ADD<span>
                      <img src={Enter} alt="enter" />
                    </span>
                  </button>
                  <button className="cancelBtn" type="button" onClick={handleCancel}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}
            <div className="horizontalBar"></div>
            <Todotask taskList={taskList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Listview;
