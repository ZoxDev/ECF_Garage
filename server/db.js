// connect the database

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "oui",
    host: "localhost",
    port: 5432,
    database: "garagevparrot"
});

module.exports = pool;