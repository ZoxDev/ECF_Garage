const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt")

// Routes
// Register (Admin create users)
router.post("/register", async(req, res) =>{
    try {
        
        //Destructure
        const {name, email, password} = req.body;
        
        // User already exist ?
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]);

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        // Crypt password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // Enter new user
        const newUser = await pool.query
        ("INSERT INTO users (user_name, user_email, user_paswword) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptPassword]
        );

        res.json(newUser.rows[0])

        // Create token
        
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;