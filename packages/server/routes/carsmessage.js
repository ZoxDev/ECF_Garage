const app = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Car message (visitor post) (employee get & delete) (carmessageid | carusername | caruserlastname | carusermail | carusermessage | datemeet | hourmeet)
// User can send message (form)
app.post("", async (req, res) => {
    try {
        const { carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel } = req.body;
        const createMessage = await pool.query("INSERT INTO carsmessage (carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel) VALUES($1, $2, $3, $4, $5, $6)",
            [carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel]);

        res.json(createMessage.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// get message for employee
app.get("", async (req, res) => {
    try {
        const getCarMessage = await pool.query("SELECT * FROM carsmessage");
        res.json(getCarMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// employee can delete the message
app.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM carsmessage WHERE carmessageid = $1",
            [id]);

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;