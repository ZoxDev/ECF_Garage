const pool = require("../db");

// Get
const getCars = async (req, res) => {
    try {
        const getCars = await pool.query("SELECT * FROM cars");

        res.json(getCars.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// Post
const postCars = async (req, res) => {
    try {
        const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;

        const createCar = await pool.query(
            "INSERT INTO cars (carbrand, carmodel, circulationdate, engine, price ,distancetravel) VALUES($1, $2, $3, $4, $5 ,$6)",
            [carbrand, carmodel, circulationdate, engine, price, distancetravel]
        );

        res.json(createCar.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
};

// Put
const putCars = async (req, res) => {
    try {
        const { id } = req.params;

        const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;
        const carUpdate = await pool.query(
            "UPDATE cars SET (circulationdate, engine, price ,distancetravel) = ($1,$2,$3,$4) WHERE carid = $5",
            [circulationdate, engine, price, distancetravel, id]
        );

        res.json("Car update");

    } catch (err) {
        console.error(err.message);
    }
};

// Delete
const deleteCars = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCar = await pool.query("DELETE FROM cars WHERE carid = $1", [id])

        res.json("car deleted");

    } catch (err) {
        console.error(err.message);
    }
};

// Export
module.exports = {
    getCars,
    postCars,
    putCars,
    deleteCars
};