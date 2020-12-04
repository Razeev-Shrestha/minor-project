import orderactionTypes from './orderactionTypes'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderactionTypes.ORDER_CREATE_REQUEST,
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        }
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: orderactionTypes.ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: orderactionTypes.ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderactionTypes.ORDER_DETAILS_REQUEST,
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: orderactionTypes.ORDER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: orderactionTypes.ORDER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const payOrder = (orderId, payment_result) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: orderactionTypes.ORDER_PAY_REQUEST,
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        }
        const { data } = await axios.put(
            `/api/orders/${orderId}/pay`,
            payment_result,
            config
        )
        dispatch({
            type: orderactionTypes.ORDER_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: orderactionTypes.ORDER_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
export const listMyOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: orderactionTypes.MYORDER_LIST_REQUEST,
        })

        const {
            userSignin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.jwtToken}`,
            },
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({
            type: orderactionTypes.MYORDER_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: orderactionTypes.MYORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
