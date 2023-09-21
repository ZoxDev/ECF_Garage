const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authorization");
const authorization = require("../middleware/authorization");

// Routes
// Get
router.get("/getemployee", async(req, res) =>{
    try {
        const getUser = await pool.query("SELECT * FROM users")
        res.json(getUser.rows);

    } catch (err) {
        console.error(err);
    }
});

// Register (Admin create users)
router.post("/createemployee", async(req, res) =>{
    try {
        //Destructure
        const {name, email, password} = req.body;
        const role = "employee";
        
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
        ("INSERT INTO users (user_name, user_email, user_paswword, user_role) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, bcryptPassword, role]
        );

        // The user is created

    } catch (err) {
        console.error(err.message);
    }
})

// Delete user 
router.delete("/delete/:id", authorization, async(req, res) =>{
    try {
        const {id} = req.params;

        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])
    } catch (err) {
        console.error(err.message);
    }
})


// Login
router.post("/login", async(req, res) =>{
    try {
        // Destructure
        const {name, password} = req.body;

        // User exist ?
        const user = await pool.query("SELECT * FROM users WHERE user_name = $1",
        [name]);

        if(user.rows.length === 0){
            return res.status(401).json("Mail ou mot de passe incorect...");
        }

        // Check if incomming password == database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_paswword);

        if(!validPassword){
            res.status(401).json("Mail ou mot de passe incorect...");
        } 

        // Get the role
        const role = user.rows[0].user_role;

        // give a token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token, role});

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