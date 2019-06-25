import React from 'react'

const Field = ({ label, value, onChange }) => (
  <div>
    {label}<input value={value} onChange={onChange} />
  </div>
)

export default Field
