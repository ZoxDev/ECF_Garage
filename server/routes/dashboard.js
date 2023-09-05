const router = require("express").Router();
const pool = require("../db");
const auth = require("../middleware/authorization");


router.get("/", auth, async(req, res) =>{

    try {
        // Get the user name while connect to dashboard
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
            req.user
        ])
        
        res.json(user.rows[0].user_name)
    } catch (err) {
        console.error(err)
    }

});

module.exports = router;