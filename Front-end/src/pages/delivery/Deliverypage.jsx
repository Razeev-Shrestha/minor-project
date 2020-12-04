import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap'
import Header from '../../components/Header/Header.component'
import Formcontainer from '../../components/FormContainer'
import { savedeliveryAddress } from '../../redux/cart/cartActions'
import Paymentsteps from '../../components/paymentsteps/Paymentsteps.component'

const Deliverypage = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { deliveryAddress } = cart
    const [address, setAddress] = useState(deliveryAddress.address)
    const [city, setCity] = useState(deliveryAddress.city)
    const [country, setCountry] = useState(deliveryAddress.country)
    const dispatch = useDispatch()
    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savedeliveryAddress({ address, city, country }))
        history.push('/payment')
    }

    return (
        <div>
            <Header />
            <Formcontainer>
                <Paymentsteps step1 step2 />
                <h1 className='py-3'>Delivery Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='firstname' >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Address'
                            value={address}
                            required
                            onChange={event => setAddress(event.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city' >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='City'
                            value={city}
                            required
                            onChange={event => setCity(event.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='firstname' >
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Country'
                            value={country}
                            required
                            onChange={event => setCountry(event.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Proceed To Payment
                                </Button>
                </Form>
            </Formcontainer>
        </div>
    )
}

export default Deliverypage
