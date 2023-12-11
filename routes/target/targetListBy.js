var express = require("express");
var router = express.Router();

var { Target } = require("../models");

/* GET users listing. */
router.post("/", async function (req, res) {
  const search = req.body || [];

  let filter = {};

  if (search) {
    if (search.length) {
      search.forEach((item) => {
        if (item.value) {
          if (item.operator === "IN") {
            filter[item.propetryName] = { $in: item.value };
          } else if (item.operator === "LIKE") {
            let regex = new RegExp(item.value, "i");

            filter = {
              $or: [
                { infoName: { $regex: regex } },
                { userName: { $regex: regex } },
                { career: { $regex: regex } },
              ],
            };
          } else if (item.operator === "BETWEEN") {
            filter[item.propetryName] = {
              $gte: item.value[0],
              $lte: item.value[1],
            };
          } else {
            filter[item.propetryName] = item.value;
          }
        }
      });
    }
  } else {
    res.send({ code: 500, message: "参数不能为空" });
  }

  const list = await Target.find(filter).sort("updateTime");

  if (list) {
    res.json({
      code: 200,
      data: { result: list },
      msg: "ok",
    });
  }
});

module.exports = router;
