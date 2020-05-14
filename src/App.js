import React, {useState, useRef, useEffect} from 'react';
import PendienteList from './PendienteList';
import {v4 as uuidv4} from 'uuid';
import styled from 'styled-components'
import unchecked from './img/unchecked.svg'
import checked from './img/checked.svg'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoTitleRef = useRef()
  const todoNameRef = useRef()
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    
  }, [todos])
  function  toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  function handleAddToDo(e){
    
    const name = todoNameRef.current.value
    const title = todoTitleRef.current.value
    if ( name === '' ) return
    setTodos(prevTodos => {
      return [...prevTodos, {id:uuidv4(), name: name, title:title, complete:false}]
    })
    todoNameRef.current.value = null 
    todoTitleRef.current.value = null

  }
  
  function handleClearTodos(){
    const newTodos = todos.filter( todo => !todo.complete)
    setTodos(newTodos)
  }
  const Wrap = styled.div`
  *{
    box-sizing:border-box;
  }
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
html,body{
background-color:#F4F2F2;
}  
  font:100%/1.5 'Bemio', sans-serif;
  color:#333300;
  justify-content:space-evenly;
  
  
  display:grid;
  height:100vh;
  width:100vw;
  
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: .6fr 1fr 1fr 1fr ;
  grid-template-areas: 'nav nav nav nav nav'
                        '. contenido contenido contenido .'
                        '. restantes . entrada .'
                        '. limpiar . agregar .';
  gap:10px;
  .nav{
    padding:1em;
 
    grid-area: nav;  
     font-size: 3em;
     display:flex;
     align-items:center;
  
  }
   .td{
     grid-area: contenido;
  }
  .agregar{
    grid-area: agregar;
    background-color:#333300;
    color:#FCFCFC;
    border-radius: 3em;
    height:40px;
  }
  .limpiar{
    grid-area: limpiar;
    background-color:#333300;
    color:#FCFCFC;
    border-radius: 3em;
    height:40px;
    
  }
   .restantes{
    grid-area: restantes; 
    align-items: center;
    justify-content:center;
    display: flex;
  }
    .entrada{
    grid-area: entrada; 
    height: 50%;
  }
  .entrada-titulo{
    
    height: 50%;
  }
  li{
 text-decoration: none;
     list-style:none;
  }
  li:hover{
  animation-name: rainbow;
  animation-duration: 1000ms;
  animation-iteration-count: infinite; 
  animation-timing-function: linear;
  cursor:progress;
}
.todo{

  width:90%;
  height:90%;
  padding:1em;
  margin:1em;
 
  background-color:#FCFCFC;
}
p{
  font-family: 'IBM Plex Sans Condensed', sans-serif;
  font-size:1.4em;
}
h2{
  font-size:1.7em;
}
.checkbox{
	opacity:0;
	
}
.customCheckbox{
  background-image: url(${unchecked});
	
  background-repeat: no-repeat;
  background-size:1em;
  height: 1em;
  display:flex;
  z-index:1;
	margin-top:-1.2em;

  


}
.checkbox:checked + .customCheckbox{
background-image: url(${checked});
  

}
@keyframes rainbow{
0% {
color: royalblue; 
}
  
10%{
color: #e56333;
}
  
20%{
color: #ecab3b; 
}

 30%{
color: #f9e264; 
}
  40%{
color: #9bebaa; 
}
  50%{
color: #96f0e4; 
}
  60%{
color: #74d3fa; 
}
  70%{
color: #2c9ae7; 
}
  80%{
color: #dc9ffb; 
}
  90%{
color: #ff90ba; 
}
  100%{
color: #ff72b4; 
}
@media only screen and (min-width: 768px) and {
  
}
}


 
  `
  return (
   <Wrap> 
    <nav className='nav'>
      <ul>
        <li>Pendientes</li>
      </ul>
    </nav> 
    <PendienteList className='td' todos={todos} toggleTodo={toggleTodo}/>
    <div className='restantes'>{todos.filter(todo => !todo.complete).length} pendientes por terminar</div>
    <input className='entrada' ref={todoNameRef} type='text' required='required'></input>
    
    <input placeholder='Pon aquí el título de tu pendiente'className='entrada-titulo' id='titulo'ref={todoTitleRef} type='text'></input>
    <button className='agregar' onClick={handleAddToDo}>Agregar pendiente</button>
    <button className='limpiar' onClick={handleClearTodos}>Limpiar pendientes terminados</button>
   
  </Wrap>
  )
}

export default App;
