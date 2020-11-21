# Part 1 / Unicafe

This is my submission for the Full Stack Open [Course](https://fullstackopen.com/en) 2020, part 1.d

This application takes user feedback and shows appreciation statistics.

## Learning focus

- complex state
- rules of hooks
- conditional rendering
- debugging React apps
- JS data structures
- render a &#60;table&#62; in React

## Notes

### Complex state
- in this case it made sense to store the states in separated objects
- check React's official [documentation](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) for notes about this

### Rules of hooks
- ``useState`` must be called from inside a function body that defines a component
- **do not** call it from a loop or conditional, or any place where it is not stable

### JS data structure
- I decided to store ``labels`` and ``stats`` as separated objects as ``labels`` were going to be also accessed by buttons

### Render a &#60;table&#62; in React
- React requires that a &#60;thead&#62;, &#60;tbody&#62; and &#60;tfoot&#62; are set

## Stack

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Javascript follows [ES10](http://www.ecma-international.org/ecma-262/10.0/index.html) specifications.

## Usage

First clone the project and navigate to ``courseinfo/``.

Then run:

```
npm start
```

Finally open [http://localhost:3000](http://localhost:3000) to view the app in the browser.


## Improvements and beyond

- Refactor to rendere the table rows with a ``for loop``
- Add style