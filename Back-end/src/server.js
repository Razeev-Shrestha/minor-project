const express = require('express')
const env = require('dotenv')
const app = express()

env.config()

const { notFound, errorHandler } = require('../middleware/error.middleware')
const userRoutes = require('./routes/users.routes')
const adminRoutes = require('./routes/admins.routes')
const productRoutes = require('./routes/products.routes')
const orderRoutes = require('./routes/orders.routes')
const mailRoutes=require('./routes/mail.routes')
// const vendorRoutes = require('./routes/vendors.routes');

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/mail',mailRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3006

app.listen(port, () => {
    console.log(
        `server is running in ${process.env.NODE_ENV} mode on port ${port}`
    )
})
