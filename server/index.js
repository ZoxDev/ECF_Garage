const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); // req.body

// Routes

// Create user
app.post("/users", async(req, res) => {
    try {
        const {userMail, userPassword} = req.body;

        const newUserMail = await pool.query("INSERT INTO users (userMail, userPassword) VALUES($1, $2) RETURNING *", 
        [userMail, userPassword]
        );
        console.log(req.body);
        res.json(newUserMail.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

// get all user
app.get("/users", async(req,res) => {
    try {
        const getUsers = await pool.query("SELECT * FROM users")
        res.json(getUsers.rows);
    } catch (err) {
      console.error(err.message);  
    }
});

// get a user
app.get("/users/:id", async (req,res) => {
try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE userid = $1", [id]);

    res.json(user.rows[0]);
} catch (err) {
   console.error(err.message); 
}
});

// update user

app.put("/users/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const { userMail, userPassword} = req.body;
        const updateUser = await pool.query("UPDATE users SET (userMail, userPassword) =($1, $2) WHERE userid = $3", 
        [userMail, userPassword, id]);

        res.json("updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete user
app.delete("/users/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE userid = $1",
        [id])

        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});





// Tout les appel API
// Presentation page (GET UPDATE) infoid | infotitle | infotext
// Get infos
app.get("/infos", async(req,res) => {
    try {
        const getInfo = await pool.query("SELECT * FROM presinfo")
        res.json(getInfo.rows);
    } catch (err) {
      console.error(err.message);  
    }
});

// Post info
app.post("/infos", async(req, res) => {
    try {
        // Add info
            // Si <3 ok else you can't put new info

            // SELECT COUNT(column_name)

            const {infoTitle, infoText} = req.body;

            const newInfo = await pool.query("INSERT INTO presinfo (infotitle, infotext) VALUES($1, $2) RETURNING *", 
            [infoTitle, infoText]
            );
            console.log(req.body);
            res.json(newInfo.rows[0]);
 
        
    } catch (err) {
        console.error(err.message);
    }
});

// Put info
app.put("/infos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const {infoTitle, infoText} = req.body;

    

        const updateInfo = await pool.query("UPDATE presinfo SET (infoTitle, infoText) =($1,$2) WHERE infoid = $3",
        [infoTitle, infoText, id]);

        console.log(req.body);
        res.json("updated")
    } catch (err) {
        console.error(err.message);
    }
});


// Listening app
app.listen(5000, () =>{
    console.log("server start port : 5000")
});

