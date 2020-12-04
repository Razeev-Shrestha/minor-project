import orderactionTypes from './orderactionTypes'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case orderactionTypes.ORDER_CREATE_REQUEST:
            return {
                loading: true,
            }
        case orderactionTypes.ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }
        case orderactionTypes.ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case orderactionTypes.ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case orderactionTypes.ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case orderactionTypes.ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case orderactionTypes.ORDER_PAY_REQUEST:
            return {
                loading: true,
            }
        case orderactionTypes.ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case orderactionTypes.ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case orderactionTypes.ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}
export const myOrderListReducer = (state = {}, action) => {
    switch (action.type) {
        case orderactionTypes.MYORDER_LIST_REQUEST:
            return {
                loading: true,
            }
        case orderactionTypes.MYORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case orderactionTypes.MYORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case orderactionTypes.MYORDER_LIST_RESET:
            return {}
        default:
            return state
    }
}
