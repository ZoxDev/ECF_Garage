const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); // req.body

// Routes


// Tout les appel API
// Users routes for admin
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

// Delte (rare)
app.delete("/infos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteInfo = await pool.query("DELETE FROM presinfo WHERE infoid = $1",
        [id])

        res.json("deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// Schedule (Dayname | hourstart | hourpause | hourstoppause | hourstop)(Get & Update)
// Get
app.get("/schedule", async(req,res) =>{
    try {
        const getSchedule = await pool.query("SELECT * FROM schedule");
        
        res.json(getSchedule.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update
app.put("/schedule/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        
        const {hourstart, hourpause, hourstoppause, hourstop} = req.body;
        console.log(req.body);
        console.log(hourstart);
        const dayUpdate = await pool.query("UPDATE schedule SET (hourstart, hourpause, hourstoppause, hourstop) = ($1,$2,$3,$4) WHERE dayname = $5",
        [hourstart, hourpause, hourstoppause, hourstop, id]);
        
        res.json("Day time update");

    } catch (err) {
        console.error(err.message);
    }
});

// Cars (post / get / delete) (carid (primarikey) | carbrand | carmodel | circulationdate | engine | distancetravel)
// get cars
app.get("/cars", async(req, res) =>{
    try {
        const getCars = await pool.query("SELECT * FROM cars");

        console.log("we get cars");
        res.json(getCars.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// post new car
app.post("/cars", async(req, res) =>{
    try {
        const {carbrand, carmode, circulationdate, engine, distancetravel} = req.body;

        const createCar = await pool.query("INSERT INTO cars (carbrand, carmodel, circulationdate, engine, distancetravel) VALUES($1, $2, $3, $4, $5)",
        [carbrand, carmode, circulationdate, engine, distancetravel]);

        res.json(createCar.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// delete car
app.delete("/cars/:id", async(req, res) =>{
    try {
        const {id} = req.params;

        const deleteCar = await pool.query("DELETE FROM cars WHERE carid = $1", [id])

        res.json("car deleted");

    } catch (err) {
        console.error(err.message);
    }
});



// Comment all
// Listening app
app.listen(5000, () =>{
    console.log("server start port : 5000")
});

