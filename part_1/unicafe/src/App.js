import React , { useState } from 'react'

const Button =(props) => {
  return(
    <button onClick = {props.onclick}> 
        {props.text}
    </button>
  )
}

const StatisticsLine =(props) =>{
  return(
    <>
     <td>{props.text}</td><td>{props.value}</td>  
    </>
  )
}

const Statistics = (props) => {
  if (props.all === 0){
    return(
      <div>
          No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr><StatisticsLine  text='Good:' value={props.good} /></tr>
          <tr><StatisticsLine  text='Neutral' value={props.neutral} /></tr>
          <tr><StatisticsLine  text='Bad' value={props.bad} /></tr>
          <tr><StatisticsLine  text='All' value={props.all} /></tr>
          <tr><StatisticsLine  text='Average' value={props.average} /></tr>
          <tr><StatisticsLine  text='Positive' value={props.positive}  /></tr>
        </tbody>
      </table>
    </div>
  )
}

const  App =() => {
  const [ good,setGood ]= useState(0)
  const [ neutral, setNeutral ] =useState(0)
  const [ bad, setBad ] = useState(0)
  const [all , sumAll ] = useState(0)
  const [average , getAverage ] = useState(0)
  const [positive , getPositivePerc ] = useState(0)
 

  // const increaseGood=() => setGood(good + 1)
  // const increaseNeutral=() => setNeutral( neutral + 1)
  // const increaseBad=() => setBad( bad +1 )
  // const sumAll =() => setAll( bad + good + neutral )



  const handleGoodRating = () => {
      setGood(good + 1)
      sumAll(good + neutral + bad) 
      getAverage(all/3)
      getPositivePerc(((good/all) * 100) + '%')
  }

  const handleNeutralRating = () => {
    setNeutral(neutral + 1)
    sumAll(good + neutral + bad) 
    getAverage(all/3)
    getPositivePerc(((good/all) * 100) + '%')
}

const handleBadRating = () => {
  setBad(bad + 1)
  sumAll(good + neutral + bad) 
  getAverage(all/3)
  getPositivePerc(((good/all) * 100) + '%')  
}

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button 
        onclick ={ handleGoodRating} 
        text='Good'
      />
       <Button 
        onclick = { handleNeutralRating } 
        text='Neutral'
      />
       <Button 
        onclick = { handleBadRating } 
        text='Bad'
      />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive ={positive} all={all}/>
    </div>
  );
}

export default App;
