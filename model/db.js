const Pool = require("pg").Pool;

const pool = new Pool({
  user: "testing",
  pastword: "123456",
  database: "aimazing_test",
  host: "localhost",
  post: 5432,
});

module.exports = pool;
