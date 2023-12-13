import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

const MyToDos = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserTodos = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          // Create a query to get tasks where email matches the current user's email
          const q = query(collection(db, 'Tasks'), where('email', '==', user.email));
          const querySnapshot = await getDocs(q);

          // Extract the tasks data from the query snapshot
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
    // Implement your delete logic here
    try {
      await deleteDoc(doc(db, 'Tasks', id));
      alert(`Delete todo with id ${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleEditTodo = (id) => {
    // Implement your edit logic here
    alert(`Edit todo with id ${id}`);
  };

  const handleCompleteTodo = async (id) => {
    try {
      // Get the task data
      const taskDoc = await doc(db, 'Tasks', id);
      const taskData = (await getDocs(taskDoc)).data();

      // Create a new document in the "Completed" collection
      await addDoc(collection(db, 'Completed'), {
        email: taskData.email,
        timeDesc: taskData.dateAndTime,
        taskName: taskData.taskName,
        taskType: taskData.taskType,
        dateAndTime: serverTimestamp(),
        completedOn: serverTimestamp(),
      });

      // Delete the task from the "Tasks" collection
      await deleteDoc(taskDoc);

      alert(`Complete todo with id ${id}`);
    } catch (error) {
      console.error('Error completing todo:', error.message);
    }
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
            <h3>{todo.name}</h3>
            <p>{todo.description}</p>
            <p><strong>Date:</strong> {todo.date}</p>
            <p><strong>Time:</strong> {todo.time}</p>
            <p><strong>Type:</strong> {todo.type}</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyToDos;
