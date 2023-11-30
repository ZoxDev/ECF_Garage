const pool = require("../db");

const getInfo = async(req, res) => {
    try {
        const getInfo = await pool.query("SELECT * FROM presinfo")
        res.json(getInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const postInfo = async(req, res) => {
    try {
        // Add info  
        const { infoTitle, infoText } = req.body;

        const newInfo = await pool.query("INSERT INTO presinfo (infotitle, infotext) VALUES($1, $2) RETURNING *",
            [infoTitle, infoText]
        );
        res.json(newInfo.rows[0]);


    } catch (err) {
        console.error(err.message);
    }
};

const putInfo = async(req, res) => {
    try {
        const { id } = req.params;
        const { infoTitle, infoText } = req.body;

        const updateInfo = await pool.query("UPDATE presinfo SET (infoTitle, infoText) = ($1,$2) WHERE infoid = $3",
            [infoTitle, infoText, id]);
        res.json("updated")
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getInfo,
    postInfo,
    putInfo
};