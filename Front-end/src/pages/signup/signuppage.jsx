import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Messagealert from '../../components/messageAlert/Messagealert.component';
import Loader from '../../components/loader/loader.component';
import { signUp } from '../../redux/user/userActions';
import Formcontainer from '../../components/FormContainer';
import Header from '../../components/Header/Header.component';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const Signuppage = ({ location, history }) => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [dateofBirth, setdateofBirth] = useState(new Date('2020-11-22'));
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userSignup = useSelector(state => state.userSignup);
    const { loading, error, userInfo } = userSignup;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(signUp(firstName, lastName, email, phonenumber, password, dateofBirth))
        }

    }

    const handleDateChange = (date) => {
        setdateofBirth(date);
    };
    return (
        <>
            <Header />
            <Container fluid='lg'>
                <Formcontainer>
                    <h1  className='py-3'>Sign Up</h1>
                    {message && <Messagealert variant='danger'>{message}</Messagealert>}
                    {error && <Messagealert variant='danger'>{error}</Messagealert>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col sm={12} lg={6} xl={6} md={6} >
                                <Form.Group controlId='firstname' >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='First Name'
                                        value={firstName}
                                        required
                                        onChange={event => setfirstName(event.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='lastname'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Last Name'
                                        value={lastName}
                                        required
                                        onChange={event => setLastName(event.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>



                        <Form.Group controlId='email' >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email Address'
                                value={email}
                                required
                                onChange={event => setEmail(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='phonenumber'>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Phone Number'
                                value={phonenumber}
                                required
                                onChange={event => setphoneNumber(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='dateofbirth'>
                            <Form.Label>Date of Birth</Form.Label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="yyyy/MM/dd"
                                    margin="normal"
                                    value={dateofBirth}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Form.Group>
                        <Row>
                            <Col sm={12} lg={6} xl={6} md={6}>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter Password'
                                        value={password}
                                        required
                                        onChange={event => setPassword(event.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId='confirmpassword' >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Retype Your Password'
                                        value={confirmPassword}
                                        required
                                        onChange={event => setconfirmPassword(event.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} lg={6} xl={6} md={6}>
                                <Button type='submit' variant='primary' style={{ padding: ' 10px 50px' }}>
                                    Sign Up
                                </Button>
                            </Col>
                            <Col sm={12} lg={6} xl={6} md={6}>
                                <Link to='/' >Forgot Password ?</Link>
                            </Col>
                        </Row>
                    </Form>
                    <Row className='py-3'>
                        <Col style={{ margin: '8px' }}>
                            Have an Account ? <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>Sign In</Link>
                        </Col>
                    </Row>
                </Formcontainer>
            </Container>
        </>
    )
}

export default Signuppage;

