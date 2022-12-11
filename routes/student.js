const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { Students, Counter } = require("../models/student_schema");

const stu_arr = require("../src/InitialData");

student_router = express.Router();

//================================================================================================================================================
student_router.get("/", async (req, res) => {
  try {
    const student = await Students.find();
    if (student.length > 0) {
      res.setHeader("content-type", "application/x-www-form-urlencoded");
      res.status(200).send({
        status: "Success",
        students: student,
      });
    } else {
      const student1 = await Students.create(stu_arr);
      res.setHeader("content-type", "application/x-www-form-urlencoded");
      res.status(200).send({
        status: "Success",
        students: student1,
      });
    }
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
});
//=================================================================================================================================================
student_router.get("/:id", async (req, res) => {
  try {
    const student = await Students.find(req.params);
    res.setHeader("content-type", "application/x-www-form-urlencoded");
    res.status(200).send({
      status: "Success",
      students: student,
    });
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
});
//===============================================================================================================================================
student_router.post("/", (req, res) => {
  try {
    const counter = Counter.findOneAndUpdate(
      { idname: "studentid" },
      { $inc: { seq: 1 } }, //9
      { new: true },
      async (err, cd) => {
        let seqid;
        console.log(cd);
        if (cd == null) {
          const newval = new Counter({ idname: "studentid", seq: 8 });
          newval.save();
          seqid = 8;
        } else {
          seqid = cd.seq;
        }
        const student = await Students.create({
          id: seqid,
          name: req.body.name,
          currentClass: req.body.currentClass,
          division: req.body.division,
        });
        res.setHeader("content-type", "application/x-www-form-urlencoded");
        res.status(200).send({
          status: "Success",
          id: seqid,
        });
      }
    );
  } catch (e) {
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
});
//============================================================================================================================================
student_router.put("/:id", async (req, res) => {
  try {
    const student = await Students.updateOne({ id: req.params.id }, req.body);
    res.setHeader("content-type", "application/x-www-form-urlencoded");
    res.status(200).send({
      status: "Success",
      students: student,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

//==============================================================================================================================================
// const m = new Students();
student_router.delete("/:id", async (req, res) => {
  try {
    const student = await Students.deleteOne({ id: req.params.id });

    res.setHeader("content-type", "application/x-www-form-urlencoded");
    res.status(200).send({
      status: "Success",
      students: student,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = student_router;
