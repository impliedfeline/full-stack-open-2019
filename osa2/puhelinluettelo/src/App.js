import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Field from './components/Field'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook,
        replace the old number with a new one?`)) {
        personService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(returnedPerson =>
            setPersons(persons.map(p =>
              p.id !== returnedPerson.id ? p : returnedPerson)))
      }
      console.log("yeet");
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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
        .then(x => setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
