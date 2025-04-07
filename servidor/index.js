const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdprueba",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const tipo = req.body.tipo;
  const password = req.body.password;

  db.query(
    "INSERT INTO usuarios(nombre,email,tipo,password) VALUES(?,?,?,?)",
    [nombre, email, tipo, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const nombre = req.body.nombre;
  const email = req.body.email;
  const tipo = req.body.tipo;
  const password = req.body.password;

  db.query(
    "UPDATE usuarios SET nombre = ?,email = ?,tipo = ?,password = ? WHERE id = ?",
    [nombre, email, tipo, password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM usuarios WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios ORDER BY nombre", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
