import React from 'react';

const Person = ({ person, drop }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <button onClick={drop}>delete</button>
      </p>
    </>
  );
};

export default Person;