import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Form, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header.component';
import Messagealert from '../../components/messageAlert/Messagealert.component';
import { addToCart, removeFromCart } from '../../redux/cart/cartActions';

const Cartpage = ({ match, location, history }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, match, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/signin?redirect=delivery')
    }
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col md={7}>
                        <h1 className='py-3'>Shopping Cart</h1>
                        {cartItems.length === 0 ? <Messagealert>Your Cart Is Empty &nbsp;<Link to='/'> Go Back</Link></Messagealert> : (
                            <ListGroup variant='flush'>
                                {cartItems?.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                Rs.{item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control as='select' value={item.qty} onChange={event => dispatch(addToCart(item.product, Number(event.target.value)))}>
                                                    {
                                                        Array.from({ length: item.countInStock }, (v, i) => i).map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Col>
                    <Col md={5}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Total ({cartItems.reduce((accumulator, currentitem) => accumulator + currentitem.qty, 0)}) items
                                </h2>
                                Total Price :&nbsp; Rs. {cartItems.reduce((accumulator, currentitem) => accumulator + currentitem.qty * currentitem.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                    Proceed To CheckOut
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Cartpage;
