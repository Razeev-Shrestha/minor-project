const db = require('../../db/index.dbconfig');

exports.adminDelete = async (req, res) => {
   try {
      await db.query('DELETE FROM admins WHERE user_id=$1', [req.user]);
      res.status(204).json({
         status: 'success',
         message: 'deleted succesfully',
      });
   } catch (err) {
      console.log(err);
   }
};
