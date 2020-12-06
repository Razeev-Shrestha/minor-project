import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Messagealert from '../../components/messageAlert/Messagealert.component';
import Loader from '../../components/loader/loader.component';
import { getuserDetails, updateUserProfile } from '../../redux/user/userActions';
import Header from '../../components/Header/Header.component';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { listMyOrder } from '../../redux/orders/orderactions'


const Profilepage = ({ history }) => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email_id, setEmail] = useState('');
    const [phonenumber, setphoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [dateofBirth, setdateofBirth] = useState(new Date('2020-11-22'));
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetail);
    const { loading, error, user } = userDetail;


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const updateuserProfile = useSelector(state => state.updateuserProfile)
    const { success, err } = updateuserProfile;

    const myOrders = useSelector(state => state.myOrders)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

    useEffect(() => {
        if (!userInfo) {
            history.push('/signin')
        } else {
            if (!user?.name) {
                dispatch(getuserDetails('userdetail'))
                dispatch(listMyOrder())
            } else {
                setfirstName(user.first_name)
                setLastName(user.last_name)
                setphoneNumber(user.phone_number)
                setdateofBirth(user.date_of_birth)
                setEmail(user.email_id)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user.user_id, firstName, lastName, phonenumber, dateofBirth, password }))
        }

    }

    const handleDateChange = (date) => {
        setdateofBirth(date);
    };
    return (
        <>
            <Header />
            <Row>
                <Col md={3}>
                    <h1 style={{ padding: '15px' }}>User Profile</h1>
                    {message && <Messagealert variant='danger'>{message}</Messagealert>}
                    {error && <Messagealert variant='danger'>{error}</Messagealert>}
                    {err && <Messagealert variant='danger'>{err}</Messagealert>}
                    {success && <Messagealert variant='success'>Profile Updated</Messagealert>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='firstname' style={{ padding: '10px' }} id='form-group'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                required
                                onChange={event => setfirstName(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='lastname' style={{ padding: '10px' }} id='form-group'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                required
                                onChange={event => setLastName(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' style={{ padding: '10px' }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email Address'
                                value={email_id}
                                required
                                disabled
                                onChange={event => setEmail(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='phonenumber' style={{ padding: '10px' }}>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Phone Number'
                                value={phonenumber}
                                required
                                onChange={event => setphoneNumber(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='dateofbirth' style={{ padding: '10px' }}>
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
                        <Form.Group controlId='confirmpassword' style={{ padding: '10px' }}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Retype Your Password'
                                value={confirmPassword}
                                required
                                onChange={event => setconfirmPassword(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' style={{ margin: '8px' }}>
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2 className='my-4'>My orders</h2>
                    {loadingOrders ? <Loader /> : errorOrders ? <Messagealert variant='danger'>{errorOrders}</Messagealert> : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID:</th>
                                    <th>DATE:</th>
                                    <th>TOTAL:</th>
                                    <th>PAID:</th>
                                    <th>DELIVERED:</th>
                                    <th>DETAIL:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.data.map(order => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.created_at}</td>
                                        <td>Rs.{order.total_price}</td>
                                        <td>{order.is_paid ? order.paid_at : (<i className='fas fa-times mx-4' style={{ color: 'red' }}></i>)}</td>
                                        <td>{order.isdelivered ? order.delivered_at: (<i className='fas fa-times mx-5' style={{ color: 'red' }}></i>)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order.order_id}`}>
                                                <Button className='btn-sm' variant='dark'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default Profilepage;

