const app = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Validation
const { processRequest } = require("zod-express-middleware");
const { z } = require('zod');


// Cars (post / get / delete) (carid (primarikey) | carbrand | carmodel | circulationdate | engine | distancetravel)
// get cars
app.get("", async (req, res) => {
    try {
        const getCars = await pool.query("SELECT * FROM cars");

        res.json(getCars.rows);
    } catch (err) {
        console.error(err.message);
    }
}
);

// Post car
app.post("",
    authorization,
    processRequest({
        body: z.object({
            carbrand: z.string().min(2).max(255),
            carmodel: z.string().min(2).max(255),
            circulationdate: z.number(),
            engine: z.string(),
            price: z.number(),
            distancetravel: z.number(),
        })
    }),
    async (req, res) => {
        try {
            const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;


            const createCar = await pool.query("INSERT INTO cars (carbrand, carmodel, circulationdate, engine, price ,distancetravel) VALUES($1, $2, $3, $4, $5 ,$6)",
                [carbrand, carmodel, circulationdate, engine, price, distancetravel]);

            res.json(createCar.rows[0]);

        } catch (err) {
            console.error(err.message);
        }
    }
);

// Update car
app.put("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;
        const carUpdate = await pool.query("UPDATE cars SET (circulationdate, engine, price ,distancetravel) = ($1,$2,$3,$4) WHERE carid = $5",
            [circulationdate, engine, price, distancetravel, id]);

        res.json("Car update");

    } catch (err) {
        console.error(err.message);
    }
});


// delete car
app.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCar = await pool.query("DELETE FROM cars WHERE carid = $1", [id])

        res.json("car deleted");

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;