import React, { useState, useEffect } from 'react';
import {Button, InputLabel, Input, FormControl, List} from '@material-ui/core';
import './App.css';
import './Todo.css';
import Todo from './Todo';
import {db} from './firebase';
import firebase from 'firebase';

function App() {
  const [todos,setTodos]=useState([]);
  const [input,setInput]=useState('');


  //when the app loads, load items from firebase
  //add new item when it gets added in UI
  //remove item when it gets removed as well

  useEffect(()=>{
    //this code fires when app loads
    db.collection('todos').orderBy('created__on','desc').onSnapshot(snapshot=>{
      setTodos(snapshot.docs.map(doc=>({key:doc.id,title:doc.data().name,timestamp:doc.data().created__on})));
    })
  },[]);

  const addTodo = (e)=>{
      e.preventDefault();
      // setTodos([...todos,input]);
      db.collection('todos').add({
        name:input,
        created__on:firebase.firestore.FieldValue.serverTimestamp()
      });
      setInput('');
  }
  return (
    <div className="App">
      <h1>MANAGE TO-DO's</h1>
      <form className="app__form">
        <FormControl>
          <InputLabel >Title</InputLabel>
          <Input value={input} onChange={e=>(setInput(e.target.value))} />
        </FormControl>
     
        <Button className="add__btn" variant="contained" color="primary" type="submit" onClick={addTodo} disabled={!input}>Add</Button>
      </form>
      <List className="todo__list">
      {todos.map(todo=>(
          <Todo data={todo} />
        ))}
      </List>
    </div>
  );
}

export default App;
