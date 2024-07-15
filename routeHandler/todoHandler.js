const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");

// create model
const Todo = new mongoose.model("Todo", todoSchema);

// Get all todo status active data
router.get("/", async (req, res) => {
  try {
    const result = await Todo.find({ status: "active" });
    res.status(200).json({
      message: "ToDos successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// get all todo and control field which one you can show
router.get("/field", async (req, res) => {
  try {
    const result = await Todo.find({ status: "active" })
      .select({
        _id: 0,
        date: 0,
      })
      .limit(2)
      .exec();
    //.limit() you can control how many data you show

    res.status(200).json({
      message: "Retrieved all data successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Get all todo data
router.get("/data", async (req, res) => {
  try {
    const result = await Todo.find();
    res.status(200).json({
      message: "get all data successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Get A todo by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await Todo.findById({ _id: req.params.id });
    res.status(200).json({
      message: "get a data successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// post A todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const result = await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// post multiple todo
router.post("/all", async (req, res) => {
  try {
    const toDos = await Todo.insertMany(req.body);
    res.status(200).json({
      message: "ToDos were inserted successfully",
      toDos,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// put todo
router.put("/:id", async (req, res) => {
  // you can use updateOne and findByIdAndUpdate
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "active",
        },
      },
      { new: true } // when you add this it show update current status
    );
    res.status(200).json({
      message: "ToDos were updated successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

// Deleted todo
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "data deleted successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error",
    });
  }
});

module.exports = router;


var a = 4
a = 7
console.log(a) 