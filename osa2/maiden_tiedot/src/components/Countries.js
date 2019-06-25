import React from 'react'

const Countries = ({ countries, weatherMap }) => {
  const displayedCountries = () => {

    if (countries.length > 10) {
      return "Too many matches, specify another filter"
    }

    if (countries.length > 1) {
      return countries.map(country =>
        <CountryListing key={country.name} country={country} />)
    }

    if (countries.length === 1) {
      const country = countries[0]
      const weather = weatherMap.get(country.name)
      return <CountrySummary country={country} weather={weather} />
    }
  }

  return (
    <div>
      {displayedCountries()}
    </div>
  )
}

const CountryListing = ({ country }) => <div>{country.name}</div>

const CountrySummary = ({ country, weather }) => {
  const languages = (
    country.languages.map(lng => <li key={lng.name}>{lng.name}</li>)
  )

  const weatherElement = () => weather === null
    ? <div></div> : <Weather weather={weather} />

  return (
    <div>
      <h2>{country.name}</h2>
      <p>
      capital {country.capital} <br />
      population {country.population} <br />
      </p>
      <h3>languages</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`}
        display="block" width="200px" />
      {weatherElement()}
    </div>
  )
}

const Weather = ({ weather }) => {
  const city = weather.location.name
  const current = weather.current

  return (
    <div>
      <h2>Weather in {city}</h2>
      <strong>temperature:</strong> {current.temp_c} Celsius <br />
      <img src={current.condition.icon} alt={current.condition.text}
        display="block" /> <br />
      <strong>wind:</strong> {current.wind_kph} kph {current.wind_dir} <br />
    </div>
  )
}

export default Countries
