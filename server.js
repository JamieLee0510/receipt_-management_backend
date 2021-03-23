const express = require("express");
const port = process.env.PORT || 3000;
const router = require("./routes/router");
const cors = require("cors");

//inorder to read .env
// require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);

// app.get("/", (req, res) => {
//   res.send("welcome to the home page babe");
// });

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server has started at %s", port);
  }
});
