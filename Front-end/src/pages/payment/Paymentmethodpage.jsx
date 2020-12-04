import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Col } from 'react-bootstrap'
import Header from '../../components/Header/Header.component'
import Formcontainer from '../../components/FormContainer'
import { savePaymentMethod } from '../../redux/cart/cartActions'
import Paymentsteps from '../../components/paymentsteps/Paymentsteps.component'

const Paymentmethodpage = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { deliveryAddress } = cart

    if (!deliveryAddress) {
        history.push('/delivery')
    }
    const [paymentMethod, setpaymentMethod] = useState('Khalti')

    const dispatch = useDispatch()
    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div>
            <Header />
            <Formcontainer>
                <Paymentsteps step1 step2 step3 />
                <h1 className='py-3'>Payment Method</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Payment Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='Khalti'
                                id='Khalti'
                                name='paymentMethod'
                                value='Khalti'
                                checked
                                onChange={(event) => setpaymentMethod(event.target.value)}
                            ></Form.Check>

                        </Col>
                    </Form.Group>
                    <Button className='mt-3' type='submit' variant='primary'>
                        Proceed
                                </Button>
                </Form>
            </Formcontainer>
        </div>
    )
}

export default Paymentmethodpage
