import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
   Row,
   Col,
   Image,
   Card,
   Button,
   Container,
   ListGroup,
   Form,
} from 'react-bootstrap';
import Rating from '../../components/Rating/Rating.component';
import Header from '../../components/Header/Header.component';
import getproductdetail from '../../redux/productdetail/productdetailAction';
import Messagealert from '../../components/messageAlert/Messagealert.component';
import Loader from '../../components/loader/loader.component';


const ProductdetailPage = ({ history, match }) => {
   const [qty, setQty] = useState(1);
   const dispatch = useDispatch();
   const userSignin = useSelector(state => state.userSignin)
   const productDetail = useSelector(state => state.productDetail)
   const { error, product, loading } = productDetail;
   useEffect(() => {
      dispatch(getproductdetail(match.params.id))
   }, [dispatch, match]);
   const addToCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`)
   }
   return (
      <>
         <Header />
         <Container>
            <Link className='btn btn-light my-3' to='/'>
               Go back
            </Link>
            {loading ? <Loader /> : error ? <Messagealert variant='danger'>{error}</Messagealert> : (
               <Row>

                  <Col md={5}>
                     <Image src={product[0]?.product_image} alt={product[0]?.product_name} fluid />
                  </Col>
                  <Col md={4}>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h3>{product[0]?.product_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Rating
                              value={product[0]?.rating}
                              text={`${product[0]?.number_of_reviews} reviews`}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>Price:Rs {product[0]?.product_price}</ListGroup.Item>
                        <ListGroup.Item>
                           Description:{product[0]?.product_description}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  <Col md={3}>
                     <Card>
                        <ListGroup variant='flush'>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Price:</Col>
                                 <Col>
                                    <strong>Rs {product[0]?.product_price}</strong>
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                              <Row>
                                 <Col>Stock:</Col>
                                 <Col>
                                    {product[0]?.count_in_stock > 0
                                       ? 'Available'
                                       : 'Out of Stock'}
                                 </Col>
                              </Row>
                           </ListGroup.Item>
                           {product[0]?.count_in_stock > 0 && (
                              <ListGroup.Item>
                                 <Row>
                                    <Col>Quantity</Col>
                                    <Col>
                                       <Form.Control as='select' value={qty} onChange={event => setQty(event.target.value)}>
                                          {
                                             Array.from({ length: product[0].count_in_stock }, (v, i) => i).map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                             ))
                                          }
                                       </Form.Control>
                                    </Col>
                                 </Row>
                              </ListGroup.Item>
                           )}
                           <ListGroup.Item>
                              <Button
                                 onClick={addToCartHandler}
                                 className='btn-block'
                                 type='button'
                                 disabled={product[0]?.count_in_stock === 0}
                              >
                                 Add To Cart
                           </Button>
                           </ListGroup.Item>
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
            )}

         </Container>
      </>
   );
};

export default ProductdetailPage;
