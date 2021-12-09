import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const delContact = (id,pname) =>{
  var resp = window.confirm(`Delete ${pname} ?`);
  if (resp === true){
    return axios.delete(`${baseUrl}/${id}`)
  }else{
    return axios.put(`${baseUrl}`)
  }
}

const updateContact = (id,newObject) =>{
  var resp = window.confirm(`${newObject.name}  is already added to the phonebook, replace the old details with the new one ?`);
  if (resp === true){
      return axios.put(`${baseUrl}/${id}`, newObject)
  }else{
    return axios.put(`${baseUrl}`)
  }
}

export default{getAll,create,delContact,updateContact}

// const logger = {
//     getAll,
//     create,
//   };
//   export default logger;
