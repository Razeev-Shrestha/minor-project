import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Paymentsteps from '../../components/paymentsteps/Paymentsteps.component'
import Messagealert from '../../components/messageAlert/Messagealert.component'
import Header from '../../components/Header/Header.component'
import { Link } from 'react-router-dom';
import { createOrder } from '../../redux/orders/orderactions'

const Placeorderpage = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    //calculate all prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.deliveryPrice = (Number((0.08 * cart.itemsPrice).toFixed(2)))
    cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.13).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.deliveryPrice) + Number(cart.taxPrice)).toFixed(0)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    useEffect(() => {
        if (success) {
            history.push(`/order/${order?.data[0].order_id}`)
        }
        // eslint-disable-next-line
    }, [history, success])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            ordered_items: JSON.stringify(cart.cartItems),
            delivery_address: cart.deliveryAddress,
            payment_method: cart.paymentMethod,
            items_price: cart.itemsPrice,
            tax_price: cart.taxPrice,
            delivery_price: cart.deliveryPrice,
            total_price: cart.totalPrice
        }))
    }
    return (
        <>
            <Header />
            <Container>
                <Paymentsteps step1 step2 step3 step4 />
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Delivery Address</h2>
                                <p>
                                    <strong>Address:</strong>
                                    {cart.deliveryAddress.address},
                                        {cart.deliveryAddress.city},
                                        {cart.deliveryAddress.country}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Ordered tems</h2>
                                {cart.cartItems.length === 0 ? <Messagealert>Your Cart Is Empty</Messagealert> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x Rs.{item.price}=Rs.{item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Items Price</Col>
                                        <Col>Rs.{cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Delivery Price</Col>
                                        <Col>{
                                            cart.itemsPrice < 500 ?
                                                'Free Delivery'
                                                :
                                                `Rs.${cart.deliveryPrice}`
                                        }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>Rs.{cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>Rs.{cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Messagealert variant='danger'>{error}</Messagealert>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Placeorderpage;
