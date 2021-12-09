import React,{useState,useEffect} from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'




const  App =()=> {
  const [newName,setNewName] =useState('')
  const [newNumber,setNewNumber] =useState('')
  const [filterCriteria,setFilterCriteria] =useState('')
  const[matches, setMatches]=useState([])
  const[persons,setPersons]=useState([])
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // const hook = () => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }
  const hook = () => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

 
 
  const addNewContact =(event) =>{
    event.preventDefault()
    if (persons.filter(e => e.name === newName || e.number === newNumber).length > 0) {
      //window.alert(`${newName} or ${newNumber} is already added to the phonebook.`);
      
    const contact = persons.find(e => e.name === newName ||  e.number === newNumber )
    const updatedContact = { ...contact, name: newName, number: newNumber }

    //update 
    // const url = `http://localhost:3001/persons/${contact.id}`
    // axios.put(url, updatedContact).then(response => {
    //   setPersons(persons.map(person => person.id !== contact.id ? person : response.data))
    // })

    // update  - single responsibility principle  - contacts.js
    contactService
      .updateContact(contact.id,updatedContact)
      .then(response =>{
        setPersons(persons.map(person => person.id !== contact.id ? person : response.data))
         //Status message
         setStatusMessage(
          `Updated  ${updatedContact.name} ${updatedContact.number} record `
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
        //**** */
      })
      .catch(error => {
        console.log('fail')
        setPersons(persons.filter(p => p.id !== contact.id))
        //error message
        setErrorMessage(
          `information of  ${updatedContact.name} ${updatedContact.number} has already been removed from server `
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        //**** */
      })
    }else{
      const contactObject = {
        name: newName,
        number:newNumber
      }
      // axios
      //   .post('http://localhost:3001/persons', contactObject)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //   })

      contactService
        .create(contactObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          //Status message
          setStatusMessage(
            `Added  ${newName} ${newNumber} `
          )
          setTimeout(() => {
            setStatusMessage(null)
          }, 5000)
          //**** */
        })
    }
      setNewName('')
      setNewNumber('')
      setFilterCriteria('')
  }

  //delete contact
const deleteContact = (id,pname) => {
  contactService
  .delContact(id,pname)
  .then(response => {
     const del = persons.filter(person => id !== person.id)
     setPersons(del)
     //Status message
     setStatusMessage(
      `Deleted  ${pname}  record `
    )
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
    //**** */
  })
  .catch(error => {
    console.log('fail')
    setPersons(persons.filter(p => p.id !== id))
    //error message
    setErrorMessage(
      `information of  ${pname} has already been removed from server `
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    //**** */
  })
}

//----------
  // handle onChange event for Name input
  const handleNameChange=(event) => {
    setNewName(event.target.value) 
  }

  // handle onChange event for Number input
  const handleNumberChange=(event) => {
    setNewNumber(event.target.value) 
  }

   // handle filter criteria change
   const handleCriteriaChange=(event) => {
    setFilterCriteria(event.target.value) 
    const re = RegExp(`.*${filterCriteria.toLowerCase().split('').join('.*')}.*`)
    setMatches(persons.filter(v => v.name.toLowerCase().match(re)))
  }

  // Choose what  to show
    const contactsToShow =filterCriteria===''
    ? persons 
    : matches


    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />
      <ErrorNotification message={errorMessage} />
        <Filter 
            filterCriteria= {filterCriteria} 
            handleCriteriaChange ={handleCriteriaChange}
            delPerson={deleteContact}
        />
   
      <h3>Add a new Contact</h3>
        <PersonForm  
            addNewContact ={addNewContact} 
            newName ={newName}  
            handleNameChange={handleNameChange}  
            newNumber={newNumber} 
            handleNumberChange ={handleNumberChange} 
            text='Add' 
        /> 
      
      <h2>Numbers</h2>
      <ul>  
        <Persons contactsToShow = {contactsToShow} ClickMe={deleteContact}/>
      </ul>
    </div>
  );
}

export default App;
