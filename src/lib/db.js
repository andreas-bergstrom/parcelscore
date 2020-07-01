const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "parcelscore",
  password: "postgres",
  port: 5432,
});

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}
