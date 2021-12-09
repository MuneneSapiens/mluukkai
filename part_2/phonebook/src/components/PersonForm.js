import React from 'react'
//personform componenet
const PersonForm =(props) =>{
    return(
      <div>
      <form onSubmit={props.addNewContact}>
      <div>
        Name: <input  
          value ={props.newName} 
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        Number: <input  
          value ={props.newNumber} 
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type={props.type}>{props.text}</button>
      </div>
    </form>
    </div>
    )
}

export default PersonForm