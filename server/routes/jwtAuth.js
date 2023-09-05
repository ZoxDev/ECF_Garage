const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authorization");

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

        // res.json(newUser.rows[0])

        // Create token
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})

    } catch (err) {
        console.error(err.message);
    }
})

// Login
router.post("/login", async(req, res) =>{
    try {
        // Destructure
        const {email, password} = req.body;

        // User exist ?
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]);

        if(user.rows.length === 0){
            return res.status(401).json("Mail ou mot de passe incorect...");
        }

        // Check if incomming password == database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_paswword);

        if(!validPassword){
            res.status(401).json("Mail ou mot de passe incorect...");
        } 
        // give a token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token})

    } catch (err) {
        console.error(err);
    }
})


// Verify
router.get("/verify", auth ,async (req, res) => {
    try {
        
        res.json(true);

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;