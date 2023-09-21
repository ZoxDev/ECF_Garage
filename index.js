const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');
const multer = require('multer');
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Create user JWT AUTH
app.use("/auth", require("./routes/jwtAuth"));

// Middleware
const authorization = require("./middleware/authorization")

// Presentation page (GET UPDATE) infoid | infotitle | infotext
// Get infos
app.get("/infos", async (req, res) => {
    try {
        const getInfo = await pool.query("SELECT * FROM presinfo")
        res.json(getInfo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Post info
app.post("/infos", authorization, async (req, res) => {
    try {
        // Add info  
        const { infoTitle, infoText } = req.body;

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
app.put("/infos/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { infoTitle, infoText } = req.body;

        const updateInfo = await pool.query("UPDATE presinfo SET (infoTitle, infoText) = ($1,$2) WHERE infoid = $3",
            [infoTitle, infoText, id]);

        console.log(req.body);
        res.json("updated")
    } catch (err) {
        console.error(err.message);
    }
});

// Schedule (Dayname | hourstart | hourpause | hourstoppause | hourstop)(Get & Update)
// Get
app.get("/schedule", async (req, res) => {
    try {
        const getSchedule = await pool.query("SELECT * FROM schedule");

        res.json(getSchedule.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update
app.put("/schedule/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const { hourstart, hourpause, hourstoppause, hourstop } = req.body;
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
app.get("/cars", async (req, res) => {
    try {
        const getCars = await pool.query("SELECT * FROM cars");

        console.log("we get cars");
        res.json(getCars.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// post new car
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/client/src/server/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '.png')
    }
})
const upload = multer({ storage: storage })

app.post("/image", authorization, upload.single('image'), async (req, res) => {
    try {
        const image = req.file;
        console.log(image + " C'est l'image");
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/cars", authorization, async (req, res) => {
    try {
        const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;

        const createCar = await pool.query("INSERT INTO cars (carbrand, carmodel, circulationdate, engine, price ,distancetravel) VALUES($1, $2, $3, $4, $5 ,$6)",
            [carbrand, carmodel, circulationdate, engine, price, distancetravel]);

        res.json(createCar.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// Update car
app.put("/cars/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const { carbrand, carmodel, circulationdate, engine, price, distancetravel } = req.body;
        const carUpdate = await pool.query("UPDATE cars SET (circulationdate, engine, price ,distancetravel) = ($1,$2,$3,$4) WHERE carid = $5",
            [circulationdate, engine, price, distancetravel, id]);

        res.json("Car update");

    } catch (err) {
        console.error(err.message);
    }
});


// delete car
app.delete("/cars/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCar = await pool.query("DELETE FROM cars WHERE carid = $1", [id])

        res.json("car deleted");

    } catch (err) {
        console.error(err.message);
    }
});

// Car message (visitor post) (employee get & delete) (carmessageid | carusername | caruserlastname | carusermail | carusermessage | datemeet | hourmeet)

// User can send message (form)
app.post("/carsmessage", async (req, res) => {
    try {
        const { carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet } = req.body;
        const createMessage = await pool.query("INSERT INTO carsmessage (carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet) VALUES($1, $2, $3, $4, $5, $6)",
            [carusername, caruserlastname, carusermail, carusermessage, datemeet, hourmeet]);

        console.log("car message sent");
        res.json(createMessage.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// get message for employee
app.get("/carsmessage", async (req, res) => {
    try {
        const getCarMessage = await pool.query("SELECT * FROM carsmessage");
        res.json(getCarMessage.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// employee can delete the message
app.delete("/carsmessage/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM carsmessage WHERE carmessageid = $1",
            [id]);

        console.log(id + "deleted");
    } catch (err) {
        console.error(err.message);
    }
});

// Notice message (visitor post) (admin get & delete) (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
// User can send message (form)
app.post("/noticemessage", async (req, res) => {
    try {
        const { noticeusername, noticeuserlastname, noticeusermessage, noticeusernote } = req.body;
        const createNotice = await pool.query("INSERT INTO noticemessage (noticeusername, noticeuserlastname, noticeusermessage, noticeusernote) VALUES($1, $2, $3, $4)",
            [noticeusername, noticeuserlastname, noticeusermessage, noticeusernote]);

        console.log("Notice send !");
        res.json(createNotice.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// get message for admin
app.get("/noticemessage", async (req, res) => {
    try {
        const getNotice = await pool.query("SELECT * FROM noticemessage");
        console.log("work");
        res.json(getNotice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// admin can delete the message
app.delete("/noticemessage/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM noticemessage WHERE noticeid = $1",
            [id]);

        console.log("Notice deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.use(express.static(path.join(__dirname, "client/dist")));
app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'client', 'dist') });
});

// Production
if (process.env.NODE_ENV === "production") {
    // server static content
    app.use(express.static(path.join(__dirname, "client/dist")));
        app.get('/*', function (req, res) {
            res.sendFile('index.html', { root: path.join(__dirname, 'client', 'dist') });
        });
}

// create multiple .js 
// Listening app
app.listen(PORT, () => {
    console.log("server start port : " + PORT)
});