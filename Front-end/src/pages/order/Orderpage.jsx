import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Messagealert from '../../components/messageAlert/Messagealert.component'
import Header from '../../components/Header/Header.component'
import { Link } from 'react-router-dom';
import Loader from '../../components/loader/loader.component'
import { getOrderDetails, payOrder } from '../../redux/orders/orderactions'
import orderactionTypes from '../../redux/orders/orderactionTypes'
import KhaltiCheckout from 'khalti-checkout-web'

const Orderpage = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { success } = orderPay

    const config = {
        // replace this key with yours
        "publicKey": "test_public_key_5958c5289c7d427db3d3b6e6928e1fcb",
        "productIdentity": order?.data[0]?.order_id,
        "productName": order?.data[0]?.order_id,
        "productUrl": "http://localhost:3000",
        "eventHandler": {
            onSuccess(payment_result) {
                // hit merchant api for initiating verfication
                dispatch(payOrder(orderId, payment_result))
                dispatch(getOrderDetails(orderId))
                dispatch({ type: orderactionTypes.ORDER_PAY_RESET })

            },
            // onError handler is optional
            onError(error) {
                // handle errors
                console.log(error);
                alert('Sorry! Error occured in your payment')
            },
            onClose() {
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };

    const checkout = new KhaltiCheckout(config);

    const handleClick = () => {
        // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({ amount: Number((order?.data[0].total_price) * 100).toFixed(1) });
    }
    useEffect(() => {

        if (!order || success) {
            dispatch(getOrderDetails(orderId))
        }

    }, [dispatch, orderId, success, history])

    return loading ? <Loader /> : error ? <Messagealert variant='danger'>{error}</Messagealert> : <>
        <Header />
        <Container>
            <h1 className='py-3'>Order Id:{order?.data[0]?.order_id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery Address</h2>
                            <p><strong>Name:</strong>{order?.data[0]?.first_name.concat(' ', order?.data[0]?.last_name)}</p>

                            <p><strong>Email:</strong><a href={`Mail To:${order?.data[0]?.email}`}>{order?.data[0]?.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order?.data[0].delivery_address.address},
                                        {order?.data[0].delivery_address.city},
                                        {order?.data[0].delivery_address.country}
                            </p>
                            {order?.data[0]?.isdelivered ? (<Messagealert variant='success'>Delivered On {order?.data[0]?.delivered_at}</Messagealert>) : (
                                <Messagealert variant='danger'> Not Delivered</Messagealert>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order?.data[0].payment_method}
                            </p>

                            {order?.data[0]?.is_paid ? (<Messagealert variant='success'>Paid On {order?.data[0]?.paid_at}</Messagealert>) : (
                                <Messagealert variant='danger'>Not Paid</Messagealert>
                            )}
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                                <h2>Ordered tems</h2>
                                {JSON.parse(order?.data[0]?.ordered_items).length === 0 ? <Messagealert> Order Is Empty</Messagealert> : (
                                    <ListGroup variant='flush'>
                                        {JSON.parse(order?.data[0]?.ordered_items)?.map((item, index) => (
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
                            </ListGroup.Item> */}
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
                                    <Col>Rs.{order?.data[0].items_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery Price</Col>
                                    <Col>{
                                        order?.data[0].items_price < 500 ?
                                            'Free Delivery'
                                            :
                                            `Rs.${order?.data[0].delivery_price}`
                                    }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs.{order?.data[0].tax_price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs.{order?.data[0].total_price}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                    <ListGroup>
                        {
                            !order?.data[0].is_paid ? (
                                <Button type='button' className='btn-block my-3' onClick={handleClick}>Pay</Button>
                            ) : (<Button type='button' className='btn-block my-3' disabled>Already Paid</Button>)
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    </>
}

export default Orderpage;
