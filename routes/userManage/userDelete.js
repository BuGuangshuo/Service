var express = require("express");
var router = express.Router();
let ObjectId = require("mongodb").ObjectId;

var {
  UserModel,
  UserInfo,
  MemberModel,
  Approve,
  GroupModel,
} = require("../models");

/* GET users listing. */
router.post("/", function (req, res) {
  const { id, userName } = req.body;
  const _userId = ObjectId(id);

  MemberModel.findOne({ userName }, function (err, data) {
    if (err) throw err;
    if (data) {
      GroupModel.findOne({ groupId: data.groupId }, function (err2, data2) {
        if (err2) throw err2;
        GroupModel.updateOne(
          { memberCount: data2.memberCount - 1 },
          function (err) {
            if (err) throw err;
            UserInfo.deleteOne({ userName: userName }, function (err3) {
              if (err3) throw err3;
              UserModel.deleteOne({ _id: _userId }, function (err4) {
                if (err4) throw err4;
                Approve.deleteOne({ userName: userName }, function (err5) {
                  if (err5) throw err5;
                  MemberModel.deleteOne(
                    { userName: userName },
                    function (err6) {
                      res.send({
                        code: 200,
                        data: { id },
                        msg: "delete success",
                      });
                    }
                  );
                });
              });
            });
          }
        );
      });
    }
  });
});

module.exports = router;
