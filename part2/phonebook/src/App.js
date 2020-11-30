import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import Form from './components/Form';
import Notification from './components/Notification';
import personService from './service/persons';


const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterString, setFilterString] = useState('');
    const [showAll, setShowAll] = useState(true);
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        personService
            .getAll()
            .then(savedPersons => {
                setPersons(savedPersons);
            });
    }, []);

    const updatePerson = (id, updatedPerson) => {
        personService
            .update(id, updatedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person =>
                    person.id !== id ? person : returnedPerson));
            })
            .catch(error => {
                showNotification(`${updatedPerson.name} was already deleted`);
            });
        setPersons(persons.filter(p => p.id !== id));
        showNotification('Successfully updated contact');
        setNewName('');
        setNewNumber('');
    };

    const addNewPerson = (event) => {
        event.preventDefault();

        if (!newName || !newNumber) {
            window.alert('Please fill in name and number');
            return;
        }

        // Handle adding duplicates
        const existingPerson = persons.find(person => person.name === newName);
        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already added to phonebook. replace the old number with this one?`)) {
                const updatedPerson = {
                    name: existingPerson.name,
                    number: newNumber
                };
                updatePerson(existingPerson.id, updatedPerson);
            }
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
        showNotification('Successfully added contact');
        setNewName('');
        setNewNumber('');
    };

    const dropPerson = (person) => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .drop(person.id);
            setPersons(persons.filter(p => p.id !== person.id));
        }
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

    const showNotification = (message) => {
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} />
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
            <div>
                {personsToShow.map(person =>
                    <Person
                        key={person.id}
                        person={person}
                        drop={() => dropPerson(person)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;