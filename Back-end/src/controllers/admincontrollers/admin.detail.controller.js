const db = require('../../db/index.dbconfig');
exports.adminDetails = async (req, res) => {
   try {
      const adminDbresults = await db.query(
         'SELECT * FROM admins WHERE user_id=$1',
         [req.user]
      );
      res.status(200).json({
         status: 'success',
         results: adminDbresults.rows.length,
         data: {
            user: adminDbresults.rows,
         },
      });
   } catch (err) {
      console.log(err);
   }
};
