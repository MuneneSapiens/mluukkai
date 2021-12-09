import React from 'react'

// Filter Componenet
const Filter =(props) =>{
    return(
      <div>
            filter shown by: <input  
            value ={props.filterCriteria} 
            onChange={props.handleCriteriaChange}
          />
      </div>
    )
  }

  export default Filter