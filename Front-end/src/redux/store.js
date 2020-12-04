import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from './product/productReducer'
import productdetailReducer from './productdetail/productdetailReducer'
import cartReducer from './cart/cartReducers'
import {
    userSigninReducer,
    userSignupReducer,
    userDetailReducer,
    userUpdateProfileReducer,
} from '../redux/user/userReducers'
import {
    myOrderListReducer,
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
} from './orders/orderReducers'
import {adminSigninReducer, adminSignupReducer, getAllUserReducer} from './admin/adminReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productdetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userDetail: userDetailReducer,
    updateuserProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders:myOrderListReducer,
    getAllUsers:getAllUserReducer,
    adminSignup:adminSignupReducer,
    adminSignin:adminSigninReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress')
    ? JSON.parse(localStorage.getItem('deliveryAddress'))
    : {}

const initialStore = {
    cart: {
        cartItems: cartItemsFromStorage,
        deliveryAddress: deliveryAddressFromStorage,
    },
    user: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialStore,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
