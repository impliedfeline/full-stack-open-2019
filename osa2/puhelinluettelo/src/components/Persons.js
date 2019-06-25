import React from 'react'

const Person = ({ name, number }) => (
  <div>{name} {number}</div>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(person =>
      <Person key={person.name} name={person.name} number={person.number} />)}
  </div>
) 

export default Persons
