import React from 'react'

const Alert = (props) => {
    if (!props.message) return null;

    return (
        <div className="alert alert-primary" role="alert">
            {props.message}
        </div>
    )
}

export default Alert
