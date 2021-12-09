import React,{useState,useEffect} from 'react';
 import axios  from 'axios';


const Toshow=(props)=>{
  if (props.length < 10 && props.length > 1) {
    return(
      <div>
        {
            props.countriesToShow.map((country,idx,arr) => {   
                return <li key={country.name.common}>
                      {country.name.official}
                      <button  value={country.name.common} onClick= {props.handleButtonClick} >
                        Show
                      </button>
                    </li>
                }) 
          } 
               
      </div>
    )
}else if(props.length === 1){

  const items = [];
  return(
  <div>
        {
            props.countriesToShow.map((country,idx,arr) => {   
                return <li key={country.name.common}>
                      <b>{country.name.official}</b>
                      <p> Capital {country.capital}</p>
                      <p> Population {country.population}</p>
                      <b> Languages</b>

                    {Object.values(country.languages).forEach((val,i) => items.push (
                        <li key ={i}>{val}</li>
                    ))}

                    <ul>{items}</ul>
                     <img src={country.flags.png} alt="flag" />
                    </li>
                    
                }) 
          } 
               
      </div>
  )
}
else{
  return(
    <div><li>Too many matches, specify another filter.</li></div>
  )
}
}

const App =() =>{
  const[countries,setCountries] = useState([])
  const [filterQuery, setFilterQuery]= useState([])
  const [matches, setMatches]= useState([])
  const [flag, setFlag]= useState([])
  const [weather, setWeather]= useState([])
  //-------------
 

  //-----------
    

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }
   
   useEffect(hook, [])


   //---------------------------------------------------------
   const flagHook = () => {
    axios
      .get('https://flagcdn.com/w320/my.png')
      .then(response => {
        setFlag(response.data)
      })
  }
   
   useEffect(flagHook, [])
   //------------------------------------------------
   //weather
   const weatherHook = () => {
    axios
      .get('https://weatherstack.com/',{ crossdomain: true ,credentials: true})
      .then(response => {
        setWeather(response.data)
      })
  }
   
   useEffect(weatherHook, [])
   //==========

   //handle button onclick
   const handleButtonClick=(event) => {
    setMatches(countries.filter(v => v.name.common=== event.target.value))
  }

  //Handle filter criteria change
  const handleFilterQueryChange=(event) => {
    setFilterQuery(event.target.value) 
    setMatches(countries.filter(v => v.name.common.toLowerCase().match(filterQuery)))
  }

  //const re = RegExp(`.*${filterQuery.toLowerCase().split('').join('.*')}.*`)
  // console.log(re)
  

  // Choose what  to show
  const countriesToShow =filterQuery===''
  ? countries 
  : matches

  console.log('countriesToShow ', countriesToShow)
  console.log("Weather ", weather)

  return (
    <div className="App">
      <div>
        Find Countries <input type="text" value={filterQuery}
          onChange ={handleFilterQueryChange}
        />
      </div>
      
      <div>
        <ul>
        <Toshow countriesToShow = {countriesToShow} length ={countriesToShow.length} flag={flag}
            handleButtonClick ={handleButtonClick}/>
        </ul>
      </div>
    
    </div>
  );
}

export default App;
