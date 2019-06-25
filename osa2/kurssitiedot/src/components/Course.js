import React from 'react'

const Header = ({ course }) => (
  <div>
    <h2>{course}</h2>
  </div>
)

const Content = ({ parts }) => {
  const rows = () => 
    parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )
    
  return (
    <div>
      {rows()}
    </div>
  )
}

const Part = ({ part, exercises }) => (
  <div>
    <p>
      {part} {exercises}
    </p>
  </div>
)

const Total = ({ parts }) => (
  <div>
    <p><strong>
      total of {parts.reduce(
        (acc, part) => acc + part.exercises,
        0)} exercises
    </strong></p>
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
