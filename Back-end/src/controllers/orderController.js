const db = require('../db/index.dbconfig')
const asyncHandler = require('express-async-handler')
const tokenGenerator = require('../../utils/jwtGenerator')
const axios = require('axios')
const env = require('dotenv')

env.config()

//@description Create new order
//@route POST /api/order
//@access Private

exports.addOrderItems = asyncHandler(async (req, res) => {
    const {
        ordered_items,
        delivery_address,
        payment_method,
        items_price,
        tax_price,
        delivery_price,
        total_price,
    } = req.body

    if (ordered_items && ordered_items.length === 0) {
        res.status(400)
        throw new Error('No order items ')
        return
    } else {
        const insertToDb = await db.query(
            `INSERT INTO orders(tax_price,delivery_price,total_price,payment_method,items_price,ordered_items,user_id,delivery_address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * `,
            [
                tax_price,
                delivery_price,
                total_price,
                payment_method,
                items_price,
                ordered_items,
                req.user,
                delivery_address,
            ]
        )
        const jwtToken = tokenGenerator(insertToDb.rows.order_id)
        res.status(201).json({
            data: insertToDb.rows,
            jwtToken,
        })
    }
})
//@description Get  orders by id
//@route GET /api/order/:id
//@access Private

exports.getOrderItemsById = asyncHandler(async (req, res) => {
    const dbResults = await db.query(
        `SELECT orders.*,users.first_name,users.last_name,users.email_id FROM orders LEFT JOIN users ON orders.user_id=users.user_id WHERE order_id=$1`,
        [req.params.id]
    )
    if (dbResults) {
        res.status(200).json({
            data: dbResults.rows,
        })
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})
//@description Update order to paid
//@route PUT /api/order/:id/pay
//@access Private

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    const dbResults = await db.query(`SELECT * FROM orders WHERE order_id=$1`, [
        req.params.id,
    ])
    if (dbResults) {
        await db.query(
            `UPDATE orders SET is_paid=$1,paid_at=CURRENT_TIMESTAMP  WHERE order_id=$2`,
            [true, req.params.id]
        )
        const data = {
            token: req.body.token,
            amount: req.body.amount,
        }
        const config = {
            headers: {
                Authorization: `key ${process.env.KHALTI_TEST_SECRET_KEY}`,
            },
        }
        await axios
            .post('https://khalti.com/api/v2/payment/verify/', data, config)
            .then((response) => {
                console.log(response.data)
                if (response.data.state.name == 'Completed') {
                    db.query(
                        `INSERT INTO payment_result (payment_id,status,update_time,amount,token,user_id,payment_type,payment_gateway) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
                        [
                            response.data.idx,
                            response.data.state.name,
                            response.data.created_on,
                            response.data.amount / 100,
                            response.data.token,
                            req.user,
                            response.data.type.name,
                            response.data.user.name,
                        ]
                    )
                } else {
                    res.status(400)
                    throw new Error('payment Error')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})

//@description get orders of logged in user
//@route PUT /api/order/myorders
//@access Private

exports.ordersOfLoggedInUser = asyncHandler(async (req, res) => {
    console.log(req.user)
    const dbResults = await db.query(`SELECT * FROM orders WHERE user_id=$1`, [
        req.user,
    ])
    res.status(200).json({
        data: dbResults.rows,
    })
})
