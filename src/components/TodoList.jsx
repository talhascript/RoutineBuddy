import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/global.css";

const TodoList = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [expandInput, setExpandInput] = useState(false);

  const inputContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setExpandInput(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleTitleChange = (event) => {
    setInputTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setInputDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTaskType(event.target.value);
  };

  const handleDateChange = (event) => {
    setTaskDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTaskTime(event.target.value);
  };

  const handleExpandInput = () => {
    setExpandInput(true);
  };

  const handleAddTodo = async () => {
    try {
      if (
        inputTitle.trim() !== "" &&
        inputDescription.trim() !== "" &&
        taskType &&
        taskDate &&
        taskTime
      ) {
        const user = auth.currentUser;

        if (user) {
          // Create a new document in the "Tasks" collection
          await addDoc(collection(db, "Tasks"), {
            email: user.email,
            taskName: inputTitle,
            taskDesc: inputDescription,
            taskType: taskType,
            dateAndTime: new Date(`${taskDate} ${taskTime}`).toISOString(),
          });

          // Clear the form inputs
          setInputTitle("");
          setInputDescription("");
          setTaskType("");
          setTaskDate("");
          setTaskTime("");
          setExpandInput(false);

          alert ('Task Successfully Added');
        }
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <div
        ref={inputContainerRef}
        className={`container todolist-width rounded mb-3 ${
          expandInput ? "border border-2 p-3 expanded" : ""
        }`}
      >
        {!expandInput ? (
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Add task..."
            onClick={handleExpandInput}
          />
        ) : (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={inputTitle}
              onChange={handleTitleChange}
              placeholder="Enter task title..."
            />
            <textarea
              className="form-control mb-2"
              rows="3"
              value={inputDescription}
              onChange={handleDescriptionChange}
              placeholder="Enter task description..."
            ></textarea>
            <div className="mb-2">
              <label htmlFor="taskType" className="form-label">
                Task Type:
              </label>
              <select
                id="taskType"
                className="form-select"
                value={taskType}
                onChange={handleTypeChange}
              >
                <option value="">Select Type</option>
                <option value="School">School</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="taskDate" className="form-label">
                Task Date:
              </label>
              <input
                type="date"
                id="taskDate"
                className="form-control"
                value={taskDate}
                onChange={handleDateChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="taskTime" className="form-label">
                Task Time:
              </label>
              <input
                type="time"
                id="taskTime"
                className="form-control"
                value={taskTime}
                onChange={handleTimeChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddTodo}>
              Add
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoList;
