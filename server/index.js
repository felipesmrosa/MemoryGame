const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gruppe@2024",
  database: "memorygame",
});

app.use(express.json());
app.use(cors());

app.post("/cadastrar", (req, res) => {
  const { usuario } = req.body;
  const { senha } = req.body;

  db.query(
    "SELECT * FROM memorygame WHERE usuario = ?",
    [usuario],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result == 0) {
        db.query(
          "INSERT INTO memorygame (usuario, senha) VALUE ( ?, ?)",
          [usuario, senha],
          (err, result) => {
            if (err) {
              res.send(err);
            }
            res.send({ msg: "Cadastrado com sucesso!" });
          }
        );
      } else {
        res.send({ msg: "Usuário já cadastrado." });
      }
    }
  );
});

app.post("/logar", (req, res) => {
  const { usuario } = req.body;
  const { senha } = req.body;

  db.query(
    "SELECT * FROM memorygame WHERE usuario = ? AND senha = ?",
    [usuario, senha],
    (err, result) => {
      if (err) {
        res.send(err);
      }
      if (result.length > 0) {
        res.send({
          msg: "Usuário logado com sucesso",
          id: result[0].id,
          usuario: result[0].usuario,
          vitorias: result[0].vitorias,
          derrotas: result[0].derrotas,
          tempo: result[0].tempo,
        });
      } else {
        res.send({ msg: "Conta não encontrada" });
      }
    }
  );
});

app.get("/getplayers", (req, res) => {
  let SQL = "SELECT * FROM memorygame";

  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/atualizarVitoria/:id", (req, res) => {
  const userId = req.params.id;
  const { timeLeft } = req.body;

  db.query(
    "UPDATE memorygame SET vitorias = vitorias + 1, tempo = ? WHERE id = ?",
    [timeLeft, userId],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Vitória atualizada com sucesso!");
      }
      console.log(result);
    }
  );
});
app.put("/atualizarDerrota/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "UPDATE memorygame SET derrotas = derrotas + 1 WHERE id = ?",
    userId,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Derrota atualizada com sucesso!");
      }
      console.log(result);
    }
  );
});
// app.put("/atualizarTempo/:id", (req, res) => {
//   const userId = req.params.id;
//   const { timeLeft } = req.body;

//   db.query(
//     "UPDATE memorygame SET tempo = ? WHERE id = ?",
//     [timeLeft, userId],
//     (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send("Tempo atualizada com sucesso!");
//       }
//       console.log(result);
//     }
//   );
// });

app.listen(5174, () => {
  console.log("Rodando Server");
});
