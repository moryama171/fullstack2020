import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const phonebook = [
  {
    name: 'Arto Hellas',
    number: '39-00-1234567'
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

ReactDOM.render(
  <React.StrictMode>
    <App phonebook={phonebook}/>
  </React.StrictMode>,
  document.getElementById('root')
);
