const Pool = require("pg").Pool;

// const pool = new Pool({
//   host: "database-1.cwvqmox6s7cu.us-east-2.rds.amazonaws.com", //process.env.DB_HOST
//   port: 5432,
//   user: "postgres",
//   pastword: "zheshipostgresql01", //process.env.DB_PASSWORD or 123456
//   database: "postgres", //postgres or aimazing_test
// });

const pool = new Pool({
  host: "localhost", //process.env.DB_HOST
  port: 5432,
  user: "postgres",
  pastword: "123456", //process.env.DB_PASSWORD or 123456
  database: "aimazing_test", //postgres or aimazing_test
});

module.exports = pool;
