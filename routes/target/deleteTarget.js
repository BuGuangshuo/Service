var express = require("express");
var router = express.Router();
var { Target } = require("../models");
let ObjectId = require("mongodb").ObjectId;

/* 注册接口 */
router.post("/", function (req, res) {
  const { id } = req.body;
  const _id = ObjectId(id);
  Target.deleteOne({ _id }, function (err, data) {
    if (err) throw err;
    res.send({ code: 200, data, msg: "删除成功" });
  });
});

module.exports = router;
