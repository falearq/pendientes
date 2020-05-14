import React from 'react'
import styled from 'styled-components'


export default function Todo({todo, toggleTodo}) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div className='todo'>
              
            <input className="checkbox" type='checkbox' checked={todo.complete} onChange={handleTodoClick}></input>
            <label  htmlFor="activadorCheckbox" id="botonCheckbox" className='customCheckbox'> </label> 
            <h2>{todo.title}</h2>
            <p>{todo.name}</p>
        </div>
    )

}

