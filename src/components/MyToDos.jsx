import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from '../firebase-config';

const MyToDos = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editableTask, setEditableTask] = useState(null);

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'Tasks'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          const userTodos = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().taskName,
            description: doc.data().taskDesc,
            date: new Date(doc.data().dateAndTime).toLocaleDateString(),
            time: new Date(doc.data().dateAndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: doc.data().taskType,
          }));

          setTodos(userTodos);
        }
      } catch (error) {
        console.error('Error fetching user tasks:', error.message);
      }
    };

    fetchUserTodos();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      const taskDocRef = doc(db, 'Tasks', id);
      const taskDoc = await getDoc(taskDocRef);
  
      if (taskDoc.exists()) {
        const taskData = taskDoc.data();
        console.log('Email:', taskData.email);
        console.log('Task Name:', taskData.taskName);
  
        // Create a new document in the "Trash" collection
        await addDoc(collection(db, 'Trash'), {
          email: taskData.email,
          taskName: taskData.taskName,
          taskDesc: taskData.taskDesc,
          taskType: taskData.taskType,
          dateAndTime: taskData.dateAndTime,
          // Use serverTimestamp for completedOn if needed
          completedOn: serverTimestamp(),
        });
  
        // Delete the document from the "Tasks" collection
        await deleteDoc(taskDocRef);
  
        // Update the local state to remove the deleted task
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error('Task document does not exist');
      }
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };
  

  const handleEditTodo = (id) => {
    setEditableTask(id);
  };

  const handleUpdateTodo = async (id, updatedTask) => {
    try {
      await setDoc(doc(db, 'Tasks', id), updatedTask);
      setEditableTask(null);
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      const taskDocRef = doc(db, 'Tasks', id);
      const taskDoc = await getDoc(taskDocRef);

      if (taskDoc.exists()) {
        const taskData = taskDoc.data();
        console.log('Email:', taskData.email);
        console.log('Task Name:', taskData.taskName);

        // Create a new document in the "Completed" collection
        await addDoc(collection(db, 'Completed'), {
          email: taskData.email,
          taskName: taskData.taskName,
          taskDesc: taskData.taskDesc,
          taskType: taskData.taskType,
          dateAndTime: taskData.dateAndTime,
          completedOn: serverTimestamp(),
        });

        await deleteDoc(taskDocRef);

        console.log('Congratulations on completing the task');

        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error('Task document does not exist');
      }
    } catch (error) {
      console.error('Error completing todo:', error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditableTask(null);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>My Tasks</h1>
      <input
        type="text"
        placeholder="Search by name or type..."
        style={{ marginBottom: '10px', padding: '5px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              border: '2px solid #ddd',
              borderRadius: '10px',
              marginBottom: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {editableTask === todo.id ? (
              <>
                <input
                  type="text"
                  value={todo.name}
                  onChange={(e) => {
                    const updatedName = e.target.value;
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? { ...prevTodo, name: updatedName } : prevTodo
                      )
                    );
                  }}
                />
                <textarea
                  value={todo.description}
                  onChange={(e) => {
                    const updatedDescription = e.target.value;
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? { ...prevTodo, description: updatedDescription } : prevTodo
                      )
                    );
                  }}
                />
                <input
                  type="type"
                  value={todo.name}
                  onChange={(e) => {
                    const updatedName = e.target.value;
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? { ...prevTodo, name: updatedName } : prevTodo
                      )
                    );
                  }}
                />
                <input
                  type="date"
                  value={todo.name}
                  onChange={(e) => {
                    const updatedName = e.target.value;
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? { ...prevTodo, name: updatedName } : prevTodo
                      )
                    );
                  }}
                />
                <input
                  type="time"
                  value={todo.name}
                  onChange={(e) => {
                    const updatedName = e.target.value;
                    setTodos((prevTodos) =>
                      prevTodos.map((prevTodo) =>
                        prevTodo.id === todo.id ? { ...prevTodo, name: updatedName } : prevTodo
                      )
                    );
                  }}
                />
                <button
                  onClick={() =>
                    handleUpdateTodo(todo.id, {
                      taskName: todo.name,
                      taskDesc: todo.description,
                      taskType: todo.type,
                      dateAndTime: todo.dateAndTime,
                      email: todo.email,
                    })
                  }
                >
                  Update
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <p>
                  <strong>Date:</strong> {todo.date}
                </p>
                <p>
                  <strong>Time:</strong> {todo.time}
                </p>
                <p>
                  <strong>Type:</strong> {todo.type}
                </p>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCompleteTodo(todo.id)}
                  >
                    Complete
                  </button>
                  <div>
                    <button
                      style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                      }}
                      onClick={() => handleEditTodo(todo.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        backgroundColor: '#dc3545',
                        color: '#fff',
                      }}
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyToDos;
