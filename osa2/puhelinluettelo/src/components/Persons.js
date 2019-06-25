import React from 'react'

const Person = ({ name, number, handleRemove }) => (
  <div>{name} {number}
    <button type="button" onClick={handleRemove}>delete</button>
  </div>
)

const Persons = ({ persons, handleRemove }) => (
  <div>
    {persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number}
        handleRemove={handleRemove(person.id)} />)}
  </div>
) 

export default Persons
