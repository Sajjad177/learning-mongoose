const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler")
// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose :
mongoose
  .connect(
    "mongodb+srv://learning-mongoose:iIsHYYDjnC779H5A@cluster0.0k2zr1q.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("connected with database successfully"))
  .catch((err) => console.log(err));

// application routers
app.use("/todo", todoHandler)

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});

