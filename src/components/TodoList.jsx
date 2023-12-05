import React, { useState, useEffect, useRef } from "react";
import "../styles/global.css";

const TodoList = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [expandInput, setExpandInput] = useState(false);
  const [todos, setTodos] = useState([]);

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

  const handleExpandInput = () => {
    setExpandInput(true);
  };

  const handleAddTodo = () => {
    if (inputTitle.trim() !== "" && inputDescription.trim() !== "") {
      setTodos([
        ...todos,
        { title: inputTitle, description: inputDescription },
      ]);
      setInputTitle("");
      setInputDescription("");
      setExpandInput(false);
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
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
            <button className="btn btn-primary" onClick={handleAddTodo}>
              Add
            </button>
          </>
        )}
      </div>
      <hr />
      <div className="container todolist-width">
        <ul className="list-group">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
              </div>
              <div className="hidden-buttons">
                <button
                  className="btn btn-success mx-1"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <i className="bi bi-check2-square"></i>
                </button>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
