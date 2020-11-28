import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Form from './components/Form';
import personService from './service/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterString, setFilterString] = useState('');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        personService
            .getAll()
            .then(savedPersons => {
                setPersons(savedPersons);
            });
    });

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
        };
        personService
            .create(newPersonObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
            });
        setNewName('');
        setNewNumber('');
    };

    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()));

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    };
    const handleFilter = (event) => {
        setFilterString(event.target.value);
        event.target.value === ''
            ? setShowAll(true)
            : setShowAll(false);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                filterString={filterString}
                handleFilter={handleFilter}
            />
            <h2>Add new person</h2>
            <Form
                onSubmit={addNewPerson}
                nameValue={newName}
                numberValue={newNumber}
                changeHandlers={{
                    name: handleNameChange,
                    number: handleNumberChange
                }}
            />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    );
};

export default App;