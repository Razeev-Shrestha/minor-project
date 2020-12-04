const db = require('../../db/index.dbconfig');
const bcrypt = require('bcrypt');
const {
   usersignupvalidateSchema,
} = require('../../../middleware/validator.middleware');

const jwtTokenGenerator = require('../../../utils/jwtGenerator')

exports.newuserSignup = async (req, res) => {
   
   
   try {
      const validateResult = usersignupvalidateSchema.validateAsync(
         req.body
      );
      const searchdb = await db.query('SELECT * FROM users WHERE email=$1', [
         validateResult.email,
      ]);
      if (searchdb.rows.length > 0) {
         res.status(400).json({
            status: 'Unauthorized',
            message: 'User already exists',
         });
      }
      const hashedPassword = await bcrypt.hashSync(
      validateResult.password,
      10
      );
      const newuserDbresults = await db.query(
         `INSERT INTO users(first_name,last_name,email,phone_number,password,date_of_birth) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * `,
         [
            validateResult.first_name,
            validateResult.last_name,
            validateResult.email,
            validateResult.phone_number,
            hashedPassword,
            validateResult.date_of_birth,
         ]
      );
      const jwtToken = jwtTokenGenerator(newuserDbresults.rows[0].user_id);
      res.status(201).json({
         status: 'success',
         message: 'user created successfully',
         results: newuserDbresults.rows.length,
         data: {
            Userid: userDbresults.rows[0].user_id,
            name:userDbresults.rows[0].first_name.concat(' ',userDbresults.rows[0].last_name),
            email: userDbresults.rows[0].email,
         },
         jwtToken,
      });
   } catch (err) {
      res.status(401).json({
         status: 'failure',
         message: err
      });
   }
};
