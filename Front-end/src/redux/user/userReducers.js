import useractionTypes from './userActionTypes'

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case useractionTypes.USER_SIGNIN_REQUEST:
            return {
                loading: true,
            }
        case useractionTypes.USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case useractionTypes.USER_SIGNIN_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        case useractionTypes.USER_SIGNOUT:
            return {}
        default:
            return state
    }
}
export const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case useractionTypes.USER_SIGNUP_REQUEST:
            return {
                loading: true,
            }
        case useractionTypes.USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case useractionTypes.USER_SIGNUP_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

const initialState = {
    loading: false,
    user: null,
}

export const userDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case useractionTypes.USER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case useractionTypes.USER_DETAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case useractionTypes.USER_DETAIL_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        case useractionTypes.USER_DETAIL_RESET:
            return{initialState}
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case useractionTypes.USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            }
        case useractionTypes.USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload,
            }
        case useractionTypes.USER_UPDATE_PROFILE_FAILURE:
            return {
                loading: false,
                err: action.payload,
            }
        default:
            return state
    }
}
