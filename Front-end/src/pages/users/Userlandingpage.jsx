import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import Header from '../../components/Header/Header.component';
import Footer from '../../components/Footer/Footer.component';
import Products from '../../components/Products/Products.component';
import listProductsAction from '../../redux/product/productActions';

import Loader from '../../components/loader/loader.component';
import Messagealert from '../../components/messageAlert/Messagealert.component';
const Userlandingpage = () => {
   const dispatch = useDispatch();

   const productList = useSelector((state) => state.productList);
   const { loading, error, allProducts } = productList;
   useEffect(() => {
      dispatch(listProductsAction());
   }, [dispatch]);
   
   const { rows } = allProducts;

   return (
      <>
         <Header />
         <main className='py-3'>
            <Container>
               <h1>Latest Products</h1>
               {loading ? (
                 <Loader />
               ) : error ? (
                  <Messagealert variant='danger'>
                     {error}
                  </Messagealert>
               ) : (
                  <Row>
                     {rows?.map(product => (
                        <Col
                           key={product.product_id}
                           sm={12}
                           md={6}
                           lg={4}
                           xl={3}
                        >
                           <Products product={product} />
                        </Col>
                     ))}
                  </Row>
               )}
            </Container>
         </main>
         <Footer />
      </>
   );
};

export default Userlandingpage;

