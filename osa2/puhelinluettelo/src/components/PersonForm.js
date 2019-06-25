import React from 'react'
import Field from './Field'

const PersonForm = ({ addPerson,
  name, handleName,
  number, handleNumber }) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <Field label="name: " value={name}
         onChange={handleName} />
        <Field label="number: " value={number}
         onChange={handleNumber} />
        <div>
          <button type="submit: ">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
