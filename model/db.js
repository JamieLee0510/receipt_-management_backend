const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.DB_HOST,
  post: 5432,
  user: "postgres",
  pastword: process.env.DB_PASSWORD,
  database: "postgres",
});

module.exports = pool;

// Endpoint

// Port
// 5432

// user:
// postgres
// password:
// zheshipostgres
