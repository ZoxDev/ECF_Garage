const pool = require("../db");

const getNoticeMessage = async(req, res) => {
    try {
        const getNotice = await pool.query("SELECT * FROM noticemessage");
        res.json(getNotice.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const postNoticeMessage = async(req, res) => {
    try {
        const { noticeusername, noticeuserlastname, noticeusermessage, noticeusernote } = req.body;
        const createNotice = await pool.query("INSERT INTO noticemessage (noticeusername, noticeuserlastname, noticeusermessage, noticeusernote) VALUES($1, $2, $3, $4)",
            [noticeusername, noticeuserlastname, noticeusermessage, noticeusernote]);

        res.json(createNotice.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
};

const deleteNoticeMessage = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteCarMessage = await pool.query("DELETE FROM noticemessage WHERE noticeid = $1",
            [id]);

    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getNoticeMessage,
    postNoticeMessage,
    deleteNoticeMessage
};