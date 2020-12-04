import axios from 'axios'
import useractionTypes from './userActionTypes'
import orderactionTypes from '../orders/orderactionTypes'

export const signIn = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: useractionTypes.USER_SIGNIN_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/users/signin',
            { email, password },
            config
        )

        dispatch({
            type: useractionTypes.USER_SIGNIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: useractionTypes.USER_SIGNIN_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const signOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: useractionTypes.USER_SIGNOUT,
    })
    dispatch({
        type: useractionTypes.USER_DETAIL_RESET,
    })
    dispatch({
        type: orderactionTypes.MYORDER_LIST_RESET,
    })
}

export const signUp = (
    first_name,
    last_name,
    email,
    phone_number,
    password,
    date_of_birth
) => async (dispatch) => {
    try {
        dispatch({
            type: useractionTypes.USER_SIGNUP_REQUEST,
        })

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }
        const { data } = await axios.post(
            '/api/users/signup',
            {
                first_name,
                last_name,
                email,
                phone_number,
                date_of_birth,
                password,
            },
            config
        )
        dispatch({
            type: useractionTypes.USER_SIGNUP_SUCCESS,
            payload: data,
        })
        dispatch({
            type: useractionTypes.USER_SIGNIN_SUCCESS,
            payload: data,
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: useractionTypes.USER_SIGNUP_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getuserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: useractionTypes.USER_DETAIL_REQUEST,
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
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: useractionTypes.USER_DETAIL_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: useractionTypes.USER_DETAIL_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: useractionTypes.USER_UPDATE_PROFILE_REQUEST,
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
        const { data } = await axios.put(`/api/users/userdetail`, user, config)
        console.log(data)
        dispatch({
            type: useractionTypes.USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: useractionTypes.USER_UPDATE_PROFILE_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
