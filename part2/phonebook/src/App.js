import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons ] = useState([
        {name: 'Arto Hellas',
         number: '39-00-1234567'}
    ]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');


    const addNewPerson = (event) => {
        event.preventDefault();
        
        // Prevent adding duplicates
        if (persons.find(person => person['name'] === newName)) {
            window.alert(`${newName} is already added to phonebook`);
            return;
        }
        const newPersonObject = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(newPersonObject));
        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNewPerson}>
                <div>
                    name: 
                    <input 
                      value={newName}
                      onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input 
                      value={newNumber}
                      onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person => 
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </div>
    )
}

export default App;