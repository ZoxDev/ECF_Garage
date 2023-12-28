const app = require("express").Router();
const authorization = require("../middleware/authorization");
const noticeMessageController = require("../controllers/NoticeMessage");

app.get("", noticeMessageController.getNoticeMessage);

app.post("", noticeMessageController.postNoticeMessage);

app.delete("/:id", authorization, noticeMessageController.deleteNoticeMessage);

module.exports = app;