import axios from 'axios'
import actionTypes from './productActionTypes'

const listProductsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_LIST_REQUEST,
        })
        const { data } = await axios.get('/api/products')
        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export default listProductsAction
