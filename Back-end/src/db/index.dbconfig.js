const { Pool } = require('pg');

const pool = new Pool()
pool
  .connect()
  .then(() => console.log(`Database connected`))
  .catch(err => console.error('connection error', err.stack))

module.exports = {
   query: (text, params) => pool.query(text, params),
};
