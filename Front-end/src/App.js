import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Admindashboardpage from './pages/admin/Admindashboardpage'
import Userlandingpage from './pages/users/Userlandingpage'
import ProductdetailPage from './pages/products/ProductdetailPage'
import Cartpage from './pages/cart/cartpage'
import Signinpage from './pages/signin/signinpage'
import Signuppage from './pages/signup/signuppage'
import Profilepage from './pages/profile/profilepage'
import Deliverypage from './pages/delivery/Deliverypage'
import Paymentmethodpage from './pages/payment/Paymentmethodpage'
import Placeorderpage from './pages/placeorder/Placeorderpage'
import Orderpage from './pages/order/Orderpage'
import Adminsignuppage from './pages/admin/Adminsignuppage'
import Adminsigninpage from './pages/admin/Adminsigninpage'
import Contactpage from './pages/contact/Contactpage'

import './App.css'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Userlandingpage} />
                <Route path='/admin/dashboard' component={Admindashboardpage} />
                <Route path='/admin/signup' component={Adminsignuppage} />
                <Route path='/admin/signin' component={Adminsigninpage} />
                <Route path='/product/:id' component={ProductdetailPage} />
                <Route path='/cart/:id?' component={Cartpage} />
                <Route path='/signin' component={Signinpage} />
                <Route path='/signup' component={Signuppage} />
                <Route path='/profile' component={Profilepage} />
                <Route path='/delivery' component={Deliverypage} />
                <Route path='/payment' component={Paymentmethodpage} />
                <Route path='/placeorder' component={Placeorderpage} />
                <Route path='/order/:id' component={Orderpage} />
                <Route path='/contact' component={Contactpage}/>
            </Switch>
        </Router>
    )
}

export default App
