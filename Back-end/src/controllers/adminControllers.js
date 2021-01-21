const db = require('../db/index.dbconfig')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtGenerator')
const {
    adminsignupvalidateSchema,
    adminsigninvalidateSchema,
    adminupdatevalidateSchema,
} = require('../../middleware/validator.middleware')

exports.getAllUsers = asyncHandler(async (req, res) => {
    const results = await db.query('SELECT * FROM users')
    res.status(200).json({
        data: results.rows,
    })
})

exports.adminSignUp = asyncHandler(async (req, res) => {
    const validateResult = await adminsignupvalidateSchema.validateAsync(
        req.body
    )
    const searchdb = await db.query('SELECT * FROM admins WHERE email=$1', [
        validateResult.email,
    ])
    if (searchdb.rows.length > 0) {
        res.status(401)
        throw new Error('User Already Exists')
    } else {
        const hashedPassword = await bcrypt.hashSync(
            validateResult.password,
            10
        )
        const newadminDbresults = await db.query(
            `INSERT INTO admins(name,email,password) VALUES ($1,$2,$3) RETURNING * `,
            [validateResult.name, validateResult.email, hashedPassword]
        )
        res.status(201).json({
            data: newadminDbresults.rows,
        })
    }
})

exports.adminSignIn = asyncHandler(async (req, res) => {
    const validateResult = await adminsigninvalidateSchema.validateAsync(
        req.body
    )
    const adminDbresults = await db.query(
        'SELECT * FROM admins WHERE email=$1',
        [validateResult.email]
    )
    if (adminDbresults.rows.length === 0) {
        res.status(401)
        throw new Error('Email not Found')
    }
    const decryptedPassword = await bcrypt.compareSync(
        validateResult.password,
        adminDbresults.rows[0].password
    )
    if (!decryptedPassword) {
        res.status(401)
        throw new Error('Password not Matched')
    }
    const jwtToken = jwtGenerator(adminDbresults.rows[0].user_id)
    res.status(200).json({
        message: 'logged in ',
        name: adminDbresults.rows[0].name,
        jwtToken,
    })
})

exports.adminUpdate = asyncHandler(async (req, res) => {
    const validateResult=await adminupdatevalidateSchema.validateAsync(req.body);
        const saltRounds=10;
        const salt=await bcrypt.genSaltSync(saltRounds);
        const hashedPassword=bcrypt.hashSync(validateResult.password,salt);
        const dbresults=await db.query('UPDATE admins SET first_name=$1,last_name=$2,user_name=$3,email_id=$4,phone_number=$5,password=$6,date_of_birth=$7 WHERE user_id=$8 RETURNING * ',
        [
            validateResult.first_name,
            validateResult.last_name,
            validateResult.user_name,
            validateResult.email_id,
            validateResult.phone_number,
            hashedPassword,
            validateResult.date_of_birth,
            req.user
        ]);
        res.status(201).json({
            status:'success',
            results:dbresults.rows.length,
            data:{
                user:dbresults.rows
            } 
        });
})

exports.adminDelete = asyncHandler(async (req, res) => {
       await db.query('DELETE FROM admins WHERE user_id=$1', [req.user]);
       res.status(204).json({
          status: 'success',
          message: 'deleted succesfully',
       });
 })
