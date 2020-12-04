import React from 'react';

import {Container} from 'react-bootstrap';

import Footer from '../../components/Footer/Footer.component';
import Adminheader from '../../components/Header/Header.component';


const Admindashboardpage = () => {
   return(
       <>
       <Adminheader />

            <Container>
                <h1>hello from admin page</h1>
             </Container>
        <Footer/>
        </>
    );
};

export default Admindashboardpage;
