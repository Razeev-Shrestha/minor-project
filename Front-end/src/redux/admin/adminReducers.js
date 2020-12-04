import adminactionTypes from './adminactionTypes'

export const getAllUserReducer = (state = {}, action) => {
    switch (action.type) {
        case adminactionTypes.GET_USER_DETAIL_REQUEST:
            return {
                loading: true,
            }
        case adminactionTypes.GET_USER_DETAIL_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
            }
        case adminactionTypes.GET_USER_DETAIL_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const adminSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case adminactionTypes.ADMIN_SIGNUP_REQUEST:
            return {
                loading: true,
            }
        case adminactionTypes.ADMIN_SIGNUP_SUCCESS:
            return {
                loading: false,
                adminInfo: action.payload,
            }
        case adminactionTypes.ADMIN_SIGNUP_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export const adminSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case adminactionTypes.ADMIN_SIGNIN_REQUEST:
            return {
                loading: true,
            }
        case adminactionTypes.ADMIN_SIGNIN_SUCCESS:
            return {
                loading: false,
                adminInfo: action.payload,
            }
        case adminactionTypes.ADMIN_SIGNIN_FAILURE:
            return {
                loading: false,
                error: action.payload,
            }
        case adminactionTypes.ADMIN_SIGNOUT:
            return {}
        default:
            return state
    }
}
