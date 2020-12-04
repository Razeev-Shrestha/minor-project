import React, { useState,useEffect  } from 'react'
import {Link} from 'react-router-dom'
import { Container,Form,Row,Col,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header.component'
import Loader from '../../components/loader/loader.component'
import Messagealert from '../../components/messageAlert/Messagealert.component'
import { adminsignUp } from '../../redux/admin/adminActions'

const Adminsignuppage = ({history,location}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const adminSignup = useSelector(state => state.adminSignup)
    const { loading, error, adminInfo } = adminSignup

    const redirect = location.search ? location.search.split('=')[1] : '/admin/dashboard'

    useEffect(()=>{
        if(adminInfo){
            history.push(redirect)
        }
    },[history,redirect,adminInfo])

    const submitHandler =(event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not Match')
        } else {
            dispatch(adminsignUp(name,email,password))
        }
    }
    return (
        <>
            <Header />
            <Container fluid='lg'>
                    <h1 className='py-3'>Sign Up</h1>
                    {message && <Messagealert variant='danger'>{message}</Messagealert>}
                    {error && <Messagealert variant='danger'>{error}</Messagealert>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Row>
                            <Col sm={12}>
                                <Form.Group controlId='firstname' >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Name'
                                        value={name}
                                        required
                                        onChange={event => setName(event.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='email' >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Email Address'
                                value={email}
                                required
                                onChange={event => setEmail(event.target.value)}
                            ></Form.Control>
                        </Form.Group>
                            </Col>
                        </Row>
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
                            Have an Account ? <Link to={redirect ? `/admin/signin?redirect=${redirect}` : '/admin/signin'}>Sign In</Link>
                        </Col>
                    </Row>
            </Container>
        </>
    )
}

export default Adminsignuppage
