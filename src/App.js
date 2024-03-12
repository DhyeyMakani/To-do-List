import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
const [isCompleteScreen, setIsCompleteScreen] = useState(false);
const [allTodos, setTodos] = useState([]);
const [newTitle, setNewTitle] = useState("");
const [newDescription, setNewDescription] = useState("");
const [completedTodos, setCompletedTodos] = useState([]);

useEffect(() => {
  let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  if (savedTodo) {
    setTodos(savedTodo);
  }
}, [])

const handleAddTodo = () => {
  let newTodoItem = {
    title: newTitle,
    description: newDescription
  }

  let updatedTodoArr = [...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);

  localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
}

const handleDeleteTodo = (index, isCompleted) => {
  let updatedTodos = isCompleted ? [...completedTodos] : [...allTodos];
  updatedTodos.splice(index, 1);

  if (isCompleted) {
    localStorage.setItem('completedTodos', JSON.stringify(updatedTodos));
    setCompletedTodos(updatedTodos);
  } else {
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  }
}

const handleComplete = (index) => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;
  let filteredItem = {
    ...allTodos[index],
    completedOn: completedOn
  }
  let updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.push(filteredItem);
  setCompletedTodos(updatedCompletedArr);
  handleDeleteTodo(index, false);
}

const handleEdit = (index) => {
  const editedTitle = prompt("Enter new title:", allTodos[index].title);
  const editedDescription = prompt("Enter new description:", allTodos[index].description);

  if (editedTitle !== null && editedDescription !== null) {
    let updatedTodos = [...allTodos];
    updatedTodos[index].title = editedTitle;
    updatedTodos[index].description = editedDescription;
    setTodos(updatedTodos);

    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  }
}

return (
  <div className="App">
    <h1>My Todos</h1>

    <div className="todo-wrapper">
      <div className="todo-input">
        <div className="todo-input-item">
          <label>Title</label>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
        </div>

        <div className="todo-input-item">
          <label>Description</label>
          <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description?" />
        </div>

        <div className="todo-input-item">
          <button type="button" onClick={handleAddTodo} className="primaryBtn">
            Add
          </button>
        </div>
      </div>

      <div className="btn-area">
        <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen === false && `active`}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
        <button className={`secondaryBtn isCompleteScreen ${isCompleteScreen === true && `active`}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
      </div>

      {isCompleteScreen === false && allTodos.map((item, i) => {
        return (
          <div className="todo-list">
            <div className="todo-list-item" key={i}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div className="button-container">
              <button className="editBtn" onClick={() => handleEdit(i)}>Edit</button>
              <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(i, false)} title="Delete" />
              <BsCheckLg className="check-icon" onClick={() => handleComplete(i)} title="Complete" />
            </div>
          </div>
        )
      })}

      {isCompleteScreen === true && completedTodos.map((item, i) => {
        return (
          <div className="todo-list">
            <div className="todo-list-item" key={i}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on: {item.completedOn}</small></p>
            </div>

            <div>
              <AiOutlineDelete className="icon" onClick={() => handleDeleteTodo(i, true)} title="Delete" />
            </div>
          </div>
        )
      })}
    </div>
  </div>
);
}

export default App;