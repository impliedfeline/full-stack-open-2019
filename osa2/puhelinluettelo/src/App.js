import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Field from './components/Field'
import personService from './services/persons'

const Notification = ({ message, style }) => (
  message && <div style={style} >{message}</div>
)


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showMessage = (message, setMessage) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== returnedPerson.id ? p : returnedPerson))
            showMessage(
              `Changed ${returnedPerson.name} number with ${returnedPerson.number}`,
              setSuccessMessage)
            resetForm()
          })
          .catch(error => {
            console.log(error.response.data)
            showMessage(
              `${error.response.data.error}`,
              setErrorMessage)
          })
      }
      return
    }

    personService
      .create({name: newName, number: newNumber})
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showMessage(`Added ${returnedPerson.name}`, setSuccessMessage)
        resetForm()
      })
      .catch(error => {
        console.log(error.response.data)
        showMessage(
          `${error.response.data.error}`,
          setErrorMessage)
      })
  }

  const filteredPersons = showName === '' ? persons :
    persons.filter(person =>
      person.name.toLowerCase().includes(showName.toLowerCase()))

  const handleInput = setter => event => setter(event.target.value)
  const handleRemove = id => () => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(_ => {
          setPersons(persons.filter(p => p.id !== id))
          showMessage(`Deleted ${person.name}`, setSuccessMessage)
        })
        .catch(error => {
          showMessage(
            `Information of ${person.name} has already been removed from server`,
            setErrorMessage)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20",
    borderStyle: "solid",
    borderRadius: "5",
    padding: "10",
    marginBottom: "10",
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification style={{ ...notificationStyle, color: "green" }} message={successMessage} />
      <Notification style={{ ...notificationStyle, color: "red" }} message={errorMessage} />
      <Field label="filter shown with " value={showName}
        onChange={handleInput(setShowName)} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson}
        name={newName} handleName={handleInput(setNewName)}
        number={newNumber} handleNumber={handleInput(setNewNumber)} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  )
}

export default App
