const pool = require("../db");

const getSchedule = async(req, res) => {
    try {
        const getSchedule = await pool.query("SELECT * FROM schedule");

        res.json(getSchedule.rows);
    } catch (err) {
        console.error(err.message);
    }
}

const updateSchedule = async(req, res) => {
    try {
        const { id } = req.params;

        const { hourstart, hourpause, hourstoppause, hourstop } = req.body;

        const dayUpdate = await pool.query("UPDATE schedule SET (hourstart, hourpause, hourstoppause, hourstop) = ($1,$2,$3,$4) WHERE dayname = $5",
            [hourstart, hourpause, hourstoppause, hourstop, id]);
        res.json("Day time update");

    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getSchedule,
    updateSchedule
};