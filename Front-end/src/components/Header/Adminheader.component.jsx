import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { signOut } from '../../redux/user/userActions';

const Adminheader = () => {
   const dispatch = useDispatch();

   const adminSignin = useSelector(state => state.adminSignin);
   const { adminInfo } = adminSignin;
   console.log(adminInfo)
   const signoutHandler = () => {
      dispatch(signOut())
   }
   return (
      <header>
         <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container fixed='top'>
               <LinkContainer to='/'>
                  <Navbar.Brand>Online Fashion Store</Navbar.Brand>
               </LinkContainer>
               <Navbar.Toggle aria-controls='basic-navbar-nav' />
               <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ml-auto'>
                     {adminInfo ? (
                        <NavDropdown title={adminInfo?.name} id='username'>
                           <LinkContainer to='/profile'>
                              <NavDropdown.Item><i className="fas fa-user-circle"></i>&nbsp;Profile</NavDropdown.Item>
                           </LinkContainer>
                           <NavDropdown.Item onClick={signoutHandler}><i className="fas fa-sign-out-alt"></i>&nbsp;Sign Out</NavDropdown.Item>
                        </NavDropdown>
                     ) : <LinkContainer to='/admin/signin'>
                           <Nav.Link>
                              <i className='fas fa-user'></i>Sign In
                     </Nav.Link>
                        </LinkContainer>}

                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </header>
   );
};

export default Adminheader;
