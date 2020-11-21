import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = () => <h1>give feedback</h1>;

const Button = ({ handleEvent, text }) => {
  return (
    <div>
      <button onClick={handleEvent}>{text}</button>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = () => setGood(good + 1);
  const setToNeutral = () => setNeutral(neutral + 1);
  const setToBad = () => setBad(bad + 1);

  return (
    <div>
      <Title />
      <Button handleEvent={setToGood} text='good'/>
      <Button handleEvent={setToNeutral} text='neutral'/>
      <Button handleEvent={setToBad} text='bad'/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
