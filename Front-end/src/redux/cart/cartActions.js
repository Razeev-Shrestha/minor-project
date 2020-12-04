import axios from 'axios'

import cartactionTypes from './cartactionTypes'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: cartactionTypes.CART_ADD_ITEM,
        payload: {
            product: data[0].product_id,
            name: data[0].product_name,
            image: data[0].product_image,
            price: data[0].product_price,
            countInStock: data[0].count_in_stock,
            qty,
        },
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: cartactionTypes.CART_REMOVE_ITEM,
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const savedeliveryAddress = (data) => (dispatch) => {
    dispatch({
        type: cartactionTypes.SAVE_DELIVERY_ADDRESS,
        payload: data,
    })
    localStorage.setItem('deliveryAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: cartactionTypes.SAVE_PAYMENT_METHOD,
        payload: data,
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
