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
    const [error, setError] = useState(false);

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
                setPersons(persons.filter(p => p.id !== id));
                showNotification('Successfully updated contact');
                setNewName('');
                setNewNumber('');
            })
            .catch(error => {
                setError(true);
                showNotification(error.response.data.error);
            });
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
            const updatedPerson = {
                name: existingPerson.name,
                number: newNumber
            };
            updatePerson(existingPerson.id, updatedPerson);
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
            })
            .catch(error => {
                setError(true);
                showNotification(error.response.data.error);
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
            setError(false);
        }, 5000);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} error={error} />
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