import axios from 'axios'
import adminactionTypes from './adminactionTypes'

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: adminactionTypes.GET_USER_DETAIL_REQUEST,
        })
        const { data } = await axios.get('/api/admin/allusers')
        dispatch({
            type: adminactionTypes.GET_USER_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: adminactionTypes.GET_USER_DETAIL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const adminsignIn = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: adminactionTypes.ADMIN_SIGNIN_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/admin/signin',
            { email, password },
            config
        )

        dispatch({
            type: adminactionTypes.ADMIN_SIGNIN_SUCCESS,
            payload: data,
        })
        sessionStorage.setItem('adminInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: adminactionTypes.ADMIN_SIGNIN_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const adminsignUp = (
    name,
    email,
    password,
) => async (dispatch) => {
    try {
        dispatch({
            type: adminactionTypes.ADMIN_SIGNUP_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/admin/signup',
            {
                name,
                email,
                password,
            },
            config
        )
        dispatch({
            type: adminactionTypes.ADMIN_SIGNUP_SUCCESS,
            payload: data,
        })
        dispatch({
            type: adminactionTypes.ADMIN_SIGNIN_SUCCESS,
            payload: data,
        })
        sessionStorage.setItem('adminInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: adminactionTypes.ADMIN_SIGNUP_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}