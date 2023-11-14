const app = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Notice message (visitor post) (admin get & delete) (noticeid | noticeusername | noticeuserlastname | noticeusermessage | noticeusernote )
// User can send message (form)
app.post("", async (req, res) => {
    try {
        const { noticeusername, noticeuserlastname, noticeusermessage, noticeusernote } = req.body;
        const createNotice = await pool.query("INSERT INTO noticemessage (noticeusername, noticeuserlastname, noticeusermessage, noticeusernote) VALUES($1, $2, $3, $4)",
            [noticeusername, noticeuserlastname, noticeusermessage, noticeusernote]);

        res.json(createNotice.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// get message for admin
app.get("", async (req, res) => {
    try {
        const getNotice = await pool.query("SELECT * FROM noticemessage");
        res.json(getNotice.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// admin can delete the message
app.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM noticemessage WHERE noticeid = $1",
            [id]);

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;