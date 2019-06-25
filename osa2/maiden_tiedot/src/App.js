import React, { useState, useEffect } from 'react';
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ show, setShow ] = useState('')
  const [ weatherMap, setWeatherMap ] = useState(new Map([]))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        countries.map(country =>
          setWeatherMap(w => w.set(country.name, null)))
        setCountries(countries)
      })
  }, [])

  const handleShow = (event) => setShow(event.target.value)
  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(show.toLowerCase())
  )

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    const API_KEY='ENTER API KEY HERE'
    
    if (weatherMap.get(country.name) === null) {
      axios
        .get(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${country.capital}`)
        .then(response => setWeatherMap(
          w => w.set(country.name, response.data)
        ))
    }
  }

  return (
    <div>
      <Filter show={show} handleShow={handleShow} />
      <Countries countries={filteredCountries} weatherMap={weatherMap} />
    </div>
  )
}

export default App;
