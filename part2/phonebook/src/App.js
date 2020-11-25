import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons ] = useState([
        {name: 'Arto Hellas',
         number: '39-00-1234567'},
        {name: 'Ada Lovelace',
         number: '39-44-5323523'},
        {name: 'Dan Abramov',
         number: '12-43-234345'},
        {name: 'Mary Poppendieck',
        number: '39-23-6423122'}
    ]);

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterString, setFilterString] = useState('');
    const [showAll, setShowAll] = useState(true);

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

    const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }
    const handleFilter = (event) => {
        setFilterString(event.target.value);
        event.target.value === ''
        ? setShowAll(true)
        : setShowAll(false)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            filter by name 
                <input
                    value={filterString}
                    onChange={handleFilter}
                />
            <h2>Add new person</h2>
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
                {personsToShow.map(person => 
                    <p key={person.name}>{person.name} {person.number}</p>
                )}
            </div>
        </div>
    )
}

export default App;