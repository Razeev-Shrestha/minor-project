import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Messagealert from '../../components/messageAlert/Messagealert.component';
import Loader from '../../components/loader/loader.component';
import { signIn } from '../../redux/user/userActions';
import Formcontainer from '../../components/FormContainer';
import Header from '../../components/Header/Header.component';

const Signinpage = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { loading, error, userInfo } = userSignin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(signIn(email, password))
    }
    return (
        <>
            <Header />
            <Container>
                <Formcontainer>
                    <h1 style={{ padding: '15px' }}>Sign In</h1>
                    {error && <Messagealert variant='danger'>{error}</Messagealert>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' style={{ padding: '10px' }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email Address'
                                value={email}
                                required
                                onChange={event => setEmail(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' style={{ padding: '10px' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                required
                                onChange={event => setPassword(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' style={{ margin: '8px' }}>
                            Sign In
                        </Button>
                    </Form>

                    <Row className='py-3'>
                        <Col style={{ }}>
                            Don't Have an Account ? <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Sign Up</Link>
                        </Col>
                        <Col>
                            <Link to='/' style={{ margin: '0 10px' }}>Forgot Password ?</Link>
                        </Col>
                    </Row>
                </Formcontainer>
            </Container>
        </>
    )
}

export default Signinpage;

