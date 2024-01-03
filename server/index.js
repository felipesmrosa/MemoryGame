const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gruppe@2024",
  database: "crudgames",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { password } = req.body;

  let SQL = "INSERT INTO games (name, password) VALUE ( ?, ? )";

  db.query(SQL, [name, password], (err, result) => {
    console.log(err);
  });
});

app.get("/getInfos", (req, res) => {
  let SQL = "SELECT * FROM games";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(5174, () => {
  console.log("Rodando Server");
});
