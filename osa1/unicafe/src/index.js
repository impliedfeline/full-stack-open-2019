import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({ handleGood, handleNeutral, handleBad }) => (
  <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGood} text="good" />
    <Button handleClick={handleNeutral} text="neutral" />
    <Button handleClick={handleBad} text="bad" />
  </div>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) {

    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incButton = (setButton, value) => () => setButton(value + 1);
  const incGood = incButton(setGood, good);
  const incNeutral = incButton(setNeutral, neutral);
  const incBad = incButton(setBad, bad);

  return (
    <div>
      <Feedback handleGood={incGood}
        handleNeutral={incNeutral}
        handleBad={incBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
