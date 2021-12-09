import React from 'react'


// //delete contact
// const deleteContact = (id) => {
//   const url = `http://localhost:3001/persons/${id}`
//   console.log('Contact ' + id + ' needs to be deleted ')
//   axios.delete(url).then(response => {
//     // const del = persons.filter(person => id !== person.id)
//     // setPersons(del)
//   })
// }
//----------

//person component
const Persons =(props)=>{
    return(
         props.contactsToShow.map((person,i) => 
              <li key={i}> 
                  {person.name} {person.number}
                  
                  {/* <button onClick={function(){deleteContact(person.id)}}> Delete </button>  */}
                  <button onClick={() => props.ClickMe(person.id,person.name)}> Delete </button>
              </li>
            )
    )}

    export default Persons