import React from 'react';
import Input from './Input';


const Form = ({ onSubmit, nameValue, numberValue, changeHandlers }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input
                  text='name'
                  value={nameValue}
                  onChange={changeHandlers.name}
                />
                <Input
                  text='number'
                  value={numberValue}
                  onChange={changeHandlers.number}
                />
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    );
}

export default Form;