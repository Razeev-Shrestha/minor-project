import React from 'react';
import { Spinner } from 'react-bootstrap';

import './loader.styles.scss';

const Loader = () => {
   return(
        <Spinner animation='border' variant='primary' role='status' className='loader' >
            {/* <span>loading...</span> */}
        </Spinner>
   );
};

export default Loader;
