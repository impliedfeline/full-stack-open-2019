import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => (
  <div><p>{anecdote}<br/>has {votes} votes</p></div>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  
  const nextAnecdote = () => (
    setSelected(Math.floor(Math.random() * anecdotes.length))
  )

  const incPoint = (index) => () => {
    const copy = [ ...points ]
    copy[index] += 1
    setPoints(copy)
  }

  const mostVotes = points.reduce(
    (acc, val, ind) => val > acc.votes ? { index: ind, votes: val } : acc,
    { index: 0, votes: points[0] }).index

  console.log(points);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <button onClick={incPoint(selected)}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[mostVotes]} votes={points[mostVotes]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
