import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return (
        // TODO: Add style
        <div>
            {message}
        </div>
    )
}

export default Notification;