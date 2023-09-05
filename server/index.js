const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json()); // req.body

// Routes


// Tout les appel API
// Create user JWT AUTH
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/dashboard", require("./routes/dashboard"));

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

// ADD IMAGES SYSTEME
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
        const {carbrand, carmodel, circulationdate, engine, price ,distancetravel} = req.body;

        const createCar = await pool.query("INSERT INTO cars (carbrand, carmodel, circulationdate, engine, price ,distancetravel) VALUES($1, $2, $3, $4, $5 ,$6)",
        [carbrand, carmodel, circulationdate, engine, price ,distancetravel]);

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

// Car message (visitor post) (employee get & delete) (carmessageid | carusername | caruserlastname | carusermail | carusermessage | datemeet | hourmeet)

// User can send message (form)
app.post("/carsmessage", async(req, res) =>{
    try {
        const {carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet} = req.body;
        const createMessage = await pool.query("INSERT INTO carsmessage (carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet) VALUES($1, $2, $3, $4, $5, $6)",
        [carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet]);

        console.log("car message sent");
        res.json(createMessage.rows[0]);

    } catch (err) {
       console.error(err.message);
    }
    });

// get message for employee
app.get("/carsmessage", async(req, res) =>{
    try {
        const getCarMessage = await pool.query("SELECT * FROM carsmessage");
        res.json(getCarMessage.rows);
    } catch (err) {
        console.error(err.message);   
    }
});

// employee can delete the message
app.delete("/carsmessage/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM carsmessage WHERE carmessageid = $1",
        [id]);

        console.log(id + "deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// Notice message (visitor post) (admin get & delete) (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
// User can send message (form)
app.post("/noticemessage", async(req, res) =>{
    try {
        const {noticeusername ,noticeuserlastname, noticeusermessage, noticeusernote} = req.body;
        const createNotice = await pool.query("INSERT INTO noticemessage (noticeusername, noticeuserlastname, noticeusermessage, noticeusernote) VALUES($1, $2, $3, $4)",
        [noticeusername, noticeuserlastname, noticeusermessage, noticeusernote]);

        console.log("Notice send !");
        res.json(createNotice.rows[0]);

    } catch (err) {
       console.error(err.message);
    }
    });

// get message for admin
app.get("/noticemessage", async(req, res) =>{
    try {
        const getNotice = await pool.query("SELECT * FROM noticemessage");
        console.log("work");
        res.json(getNotice.rows);
    } catch (err) {
        console.error(err.message);   
    }
});

// admin can delete the message
app.delete("/noticemessage/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM noticemessage WHERE noticeid = $1",
        [id]);

        console.log("Notice deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// create multiple .js 
// Listening app
app.listen(5000, () =>{
    console.log("server start port : 5000")
});