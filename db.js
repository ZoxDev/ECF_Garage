// connect the database
const Pool = require("pg").Pool;
require("dotenv").config();

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE, // Correction ici
    port: process.env.PG_PORT,
}

const proConfig = {
    connectionString : process.env.DATABASE_URL, // heroku addons
    ssl: {    /* <----- Add SSL option */
        rejectUnauthorized: false
    },
}

const pool = new Pool( 
    process.env.NODE_ENV === "production" ? proConfig : devConfig 
);

module.exports = pool;