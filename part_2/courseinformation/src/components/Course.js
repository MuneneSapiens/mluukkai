import React from "react";

const Header =({course})=>{
    return(
      <>
        <h2> { course.name }</h2>  
      </>
    );
  };
  
  const Part =(props) =>{
    return(
          <>
           <p>{props.partName}  {props.noOfEx}</p> 
          </>
    );
  };
  
  
  const Content =({course}) =>{
    return(
      <div>        
             {course['parts'].map((parti) =>(
                <Part key={parti['id']}
                 partName = {parti['name']}   
                 noOfEx = {parti['exercises']}
                 /> 
              ))}  
      </div>
    );
  };
  
  const Total =({course}) =>{
   
    var exTotal = course['parts'].reduce((totalExercises,currentValue) =>{
        return totalExercises = totalExercises + currentValue.exercises;
    },0 );
  
    return(
          <>
             <p>
               <b>Total of {exTotal} exercises</b>
              </p>
          </>
    );
  };
  
  
    const Course = ({courses}) =>{
        return(
          <>
            <h1>Web Development Curriculumn</h1>
            {courses && courses.length ? courses.map((course,index)=>(
              <div key={index}>
                <Header course={course}  />
                <Content course ={course}/>  
                <Total course ={course}/>
              </div>
            ))
            :null}
               
          </>
        );
    };

export default Course ;

