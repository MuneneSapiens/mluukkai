import React from 'react';


const Head =(props)=>{
  return(
    <>
      <h1>Course Name: {props.course}</h1>
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
const Content =() =>{
  const part1  ='Fundamentals of React'
  const excercises1 = 10
  const part2 = 'Using props to pass data'
  const excercises2 =7
  const part3 ='State of a component'
  const excercises3 = 14
  return(
    <div> 
       <Part partName = {part1} noOfEx = {excercises1} />
       <Part partName = {part2} noOfEx = {excercises2} />
       <Part partName = {part3} noOfEx = {excercises3} />
    </div>
  )
}
const Total =(props) =>{
  return(
    <>
      <p>Total Excercises: {props.ex1 + props.ex2 + props.ex3} </p>
    </>
  )
}

const  App = () => {
  const course ='Half Stack application development'
  const excercises1 = 10
  const excercises2 =7
  const excercises3 = 14
  return (
    <div >
      <Head course= {course} />
     
     <Content />
     <Total  ex1={excercises1} ex2={excercises2} ex3={excercises3} />
    </div>
  );
}

export default App;
