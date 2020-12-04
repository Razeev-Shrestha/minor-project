import axios from 'axios'

import productdetailActionTypes from './productdetailActionTypes'

const getproductdetail = (id) => async (dispatch) => {
    try {
        dispatch({
            type: productdetailActionTypes.PRODUCT_DETAIL_REQUEST,
        })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: productdetailActionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: productdetailActionTypes.PRODUCT_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export default getproductdetail
