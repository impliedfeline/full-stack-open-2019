import React, { useState, useEffect } from 'react';
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios';

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ show, setShow ] = useState('')
  const [ weatherMap, setWeatherMap ] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        setCountries(countries)
      })
  }, [])

  const handleShow = (event) => setShow(event.target.value)
  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(show.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const API_KEY='ENTER API KEY HERE'
      if (!weatherMap[country.capital]) {
        axios
          .get(`https://api.apixu.com/v1/current.json?key=${API_KEY}&q=${country.capital}`)
          .then(response => setWeatherMap({ ...weatherMap, [country.capital]: response.data }
          ))
      }
    }
  })

  return (
    <div>
      <Filter show={show} handleShow={handleShow} />
      <Countries countries={filteredCountries} weatherMap={weatherMap} />
    </div>
  )
}

export default App;
