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

const Statistics = ({stats, labels}) => {
  if (stats.totalVotes === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>{labels.good}</td>
              <td>{stats.good}</td>
            </tr>
            <tr>
              <td>{labels.neutral}</td>
              <td>{stats.neutral}</td>
            </tr>
            <tr>
              <td>{labels.bad}</td>
              <td>{stats.bad}</td>
            </tr>
            <tr>
              <td>{labels.totalVotes}</td>
              <td>{stats.totalVotes}</td>
            </tr>
            <tr>
              <td>{labels.averageScore}</td>
              <td>{stats.averageScore}</td>
            </tr>
            <tr>
              <td>{labels.positivePercentage}</td>
              <td>{stats.positivePercentage}</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    )
  }
}

const App = () => {
  
  const [goodVotes, setGood] = useState(0);
  const [neutralVotes, setNeutral] = useState(0);
  const [badVotes, setBad] = useState(0);

  const setToGood = () => setGood(goodVotes + 1);
  const setToNeutral = () => setNeutral(neutralVotes + 1);
  const setToBad = () => setBad(badVotes + 1);

  const totalVotesNum = goodVotes + neutralVotes + badVotes;  
  const averageScoreValue = (goodVotes - badVotes) / totalVotesNum;
  const positivePercentageValue = (goodVotes * 100) / totalVotesNum + '%';

  const labels = {
    good: 'good', 
    neutral: 'neutral',
    bad: 'bad',
    totalVotes: 'all',
    averageScore: 'average',
    positivePercentage: 'positive'
  }

  const stats = {
    good: goodVotes,
    neutral: neutralVotes,
    bad: badVotes,
    totalVotes: totalVotesNum,
    averageScore: averageScoreValue,
    positivePercentage: positivePercentageValue
  }

  return (
    <div>
      <PageTitle />
      <Button handleEvent={setToGood} text={labels.good}/>
      <Button handleEvent={setToNeutral} text={labels.neutral}/>
      <Button handleEvent={setToBad} text={labels.bad}/>
      <StatTitle />
      <Statistics stats={stats} labels={labels}/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
