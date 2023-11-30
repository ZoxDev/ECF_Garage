const pool = require("../db");

const getCarsMessage = async (req, res) => {
    try {
        const getCarMessage = await pool.query("SELECT * FROM carsmessage");
        res.json(getCarMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const postCarsMessage = async (req, res) => {
    try {
        const { carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel } = req.body;
        const createMessage = await pool.query("INSERT INTO carsmessage (carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel) VALUES($1, $2, $3, $4, $5, $6)",
            [carusername, caruserlastname, carusermail, carusermessage, carbrand, carmodel]);

        res.json(createMessage.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
};

const deleteCarsMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM carsmessage WHERE carmessageid = $1",
            [id]);

    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getCarsMessage,
    postCarsMessage,
    deleteCarsMessage
};