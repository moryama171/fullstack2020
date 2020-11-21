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

const Statistic = ({ text, value }) => {
  return (
  <p>{text} {value}</p>
  )
}

const Statistics = ({ data }) => {
  if (data.totalVotes.value === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <Statistic text={data.goodStats.text} value={data.goodStats.value}/>
        <Statistic text={data.neutralStats.text} value={data.neutralStats.value}/>
        <Statistic text={data.badStats.text} value={data.badStats.value}/>
        <Statistic text={data.totalVotes.text} value={data.totalVotes.value}/>
        <Statistic text={data.averageScore.text} value={data.averageScore.value}/>
        <Statistic text={data.percentageOfPositive.text} value={data.percentageOfPositive.value}/>
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
