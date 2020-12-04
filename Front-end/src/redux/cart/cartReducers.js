import cartactionTypes from './cartactionTypes'

const cartReducer = (
    state = { cartItems: [], deliveryAddress: {} },
    action
) => {
    switch (action.type) {
        case cartactionTypes.CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            )

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case cartactionTypes.CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            }

        case cartactionTypes.SAVE_DELIVERY_ADDRESS:
            return {
                ...state,
                deliveryAddress: action.payload,
            }

        case cartactionTypes.SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}

export default cartReducer
