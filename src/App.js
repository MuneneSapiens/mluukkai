import React, { useState } from 'react';


const Header =(props)=>{
  return(
    <>
      <h1>Course Name: {props.course.name}</h1>
    </>
  )

}
const Part =(props) =>{
  return(
        <>
         <p>{props.partName} {props.noOfEx}</p> 
        </>
  )
}

const Content =(props) =>{
  
  return(
    <div>     
         {
            props.course.parts.map(item => {
              return <Part  partName = {item['name']}   noOfEx = {item['excercises']}/> ;
            })
          }    
    </div>
  )
}


const Total =(props) =>{
  const numbers = props.course.parts;
  const exTotal = numbers.reduce((tex,m) => tex + m.excercises,0);
  return(
        <>
           <p>Total Exercises:  {exTotal}</p>
        </>
  )}

const  App = () => {
  const course ={
      name:'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          excercises: 10
        },
        {
          name: 'Using props to pass data',
          excercises: 7
        },
        {
          name: 'State of a component',
          excercises: 14
        }
      ]
    }
    
  return (
    <div >
      <Header course= {course} />

     <Content  course= {course}/>

     <Total  course= {course} />

     
    </div>
  );
}

export default App;
