import React from 'react';

import {Link} from 'react-router-dom';

import { Card } from 'react-bootstrap';

import Rating from '../Rating/Rating.component';



const Products = ({ product }) => {
   return (
      <Card className='my-3 p-3 rounded'>
         <Link to={`/product/${product.product_id}`}>
            <Card.Img src={product.product_image} variant='top' />
         </Link>
         <Card.Body>
            <Link to={`/product/${product._id}`}>
               <Card.Title as='div'>
                  <strong>{product.product_name}</strong>
               </Card.Title>
            </Link>
            <Card.Text as='div'>
               <Rating
                  value={product.rating}
                  text={`${product.number_of_reviews} reviews`}
               />
            </Card.Text>
            <Card.Text as='h3' style={{padding:'0.8rem 0'}}>Rs.{product.product_price}</Card.Text>
         </Card.Body>
      </Card>
   );
};

export default Products;
