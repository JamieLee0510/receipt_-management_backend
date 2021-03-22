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

app.get("/", (req, res) => {
  res.send("welcome to the home page babe");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server has started at %s", port);
  }
});

// .env:
// PORT=3000
// ACCESS_TOKEN_SECRET=a23d0fde7a3e71a4288cd5fa134e893904339f0520eb5e64cab8d563c769e50c4bc51645ecbfee1599e827ec57d0189d2fb7aaccfc1c6bba1aac02a63d73d11f
// REFRESH_TOKEN_SECRET=d9a6e80433bb63a499f5327df2c04ead7418f9bfb199df89cd4fed88eb216d41b7b43868a37c4842aca1208d0884b4d1e5dccdf29eeddf458c29d0f49efc5152
// DB_PASSWORD=zheshipostgresql
// DB_HOST=database-1.cwvqmox6s7cu.us-east-2.rds.amazonaws.com
