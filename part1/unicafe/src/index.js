import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const PageTitle = () => <h1>give feedback</h1>;

const Button = ({ handleEvent, text }) => {
  return (
    <div>
      <button onClick={handleEvent}>{text}</button>
    </div>
  )
}

const StatTitle = ()  => <h1>statistics</h1>;

const Statistics = ({ data }) => {
  if (data.totalVotes.value === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <tr>
            <td>{data.goodStats.text}</td>
            <td>{data.goodStats.value}</td>
          </tr>
          <tr>
            <td>{data.neutralStats.text}</td>
            <td>{data.neutralStats.value}</td>
          </tr>
          <tr>
            <td>{data.badStats.text}</td>
            <td>{data.badStats.value}</td>
          </tr>
          <tr>
            <td>{data.totalVotes.text}</td>
            <td>{data.totalVotes.value}</td>
          </tr>
          <tr>
            <td>{data.averageScore.text}</td>
            <td>{data.averageScore.value}</td>
          </tr>
          <tr>
            <td>{data.percentageOfPositive.text}</td>
            <td>{data.percentageOfPositive.value}</td>
          </tr>
        </table>
      </div>
    )
  }
}

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => setGood(good + 1);
  const setToNeutral = () => setNeutral(neutral + 1);
  const setToBad = () => setBad(bad + 1);

  const totalVotesValue = good + neutral + bad;  
  const averageScoreValue = (good - bad) / totalVotesValue;
  const percentageOfPositiveValue = (good * 100) / totalVotesValue + '%';

  const stats = {
    goodStats: {
      text: 'good', 
      value: good
    },
    neutralStats: {
      text: 'neutral', 
      value: neutral
    },
    badStats: {
      text: 'bad',
      value: bad
    },
    totalVotes: {
      text: 'all',
      value: totalVotesValue
    },
    averageScore: {
      text: 'average',
      value: averageScoreValue
    },
    percentageOfPositive: {
      text: 'positive',
      value: percentageOfPositiveValue
    }
  }

  return (
    <div>
      <PageTitle />
      <Button handleEvent={setToGood} text='good'/>
      <Button handleEvent={setToNeutral} text='neutral'/>
      <Button handleEvent={setToBad} text='bad'/>
      <StatTitle />
      <Statistics data={stats}/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
