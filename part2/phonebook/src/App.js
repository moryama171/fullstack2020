import React, { useState } from 'react';
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = ({ phonebook }) => {
    const [persons, setPersons ] = useState(phonebook);
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
            <Filter 
                filterString={filterString}
                handleFilter={handleFilter}
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
            <Persons personsToShow={personsToShow}/>
        </div>
    )
}

export default App;