# Part 2 / Phonebook

This is my submission for the Full Stack Open [Course](https://fullstackopen.com/en) 2020, part 2.b-d

This application is a simple phonebook where contacts can be searched, added, updated and deleted.

Here you can find the [application](https://rocky-thicket-20623.herokuapp.com/).

## Learning focus

- forms
- controlled components
- filter displayed elements
- json-server for development
- axios library
- work with promises
- effect hooks
- JS asynchronous behaviour
- JS conditionals
- JS `.filter()`
- catch errors and show notifications
- inline styling
- connect front end to back end

## Notes

### Controlled components
- *controlled* refers to how we *store* and *access* the values. For example in the case of a `<form>`:
  - *uncontrolled* means that values are stored in DOM and accessed by reaching the DOM and pulling out each input field
  - *controlled* means that values are stored and accessed as a state of a React component and updated dinamically via ``onChange``

## Stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Javascript follows ES6 specifications.

## Usage

First clone the project and navigate to ``phonebook/``.

Then run:

`npm start`

Finally open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## Improvements and beyond

- Find a better way to pass props to the ``Form``
- Add style