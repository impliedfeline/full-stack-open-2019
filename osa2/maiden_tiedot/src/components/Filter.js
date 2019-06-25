import React from 'react'

const Filter = ({ show, handleShow }) => (
  <div>find countries<input value={show} onChange={handleShow} /></div>
)

export default Filter
