# Part 1 / Anecdotes

This is my submission for the Full Stack Open [Course](https://fullstackopen.com/en) 2020, part 1.d

This application distills timeless truths about the programming world.

## Learning focus

- array handling
- JS spread syntax
- JS generate random numbers
- JS array methods

## Notes

### Array Handling
- since it's part of the state work on a copy of the array, not the original
- copy by using spread syntax ``new_arr = [...arr]``

### JS array methods
- find largest value
- find index of element

## Stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Javascript follows [ES10](http://www.ecma-international.org/ecma-262/10.0/index.html) specifications.

## Usage

First clone the project and navigate to ``anecdotes/``.

Then run:

```
npm start
```

Finally open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## Improvements and beyond
- Refactor data structure for votes and anecdotes
- Add style