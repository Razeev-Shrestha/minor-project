const db = require('../../db/index.dbconfig');

exports.userDelete = async (req, res) => {
   try {
      await db.query('DELETE FROM users WHERE user_id=$1', [req.user]);
      res.status(204).json({
         status: 'success',
         message: 'deleted succesfully',
      });
   } catch (err) {
      console.log(err);
   }
};
