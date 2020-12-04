import React from 'react';
import { Alert } from 'react-bootstrap';

const Messagealert = ({variant,children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};

Messagealert.defaultProps={
    variant:'info',
}

export default Messagealert;
