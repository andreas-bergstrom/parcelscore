import express from "express";
import bodyParser from "body-parser";
import { query } from "./lib/db";

const jsonParser = bodyParser.json();

const server = express();
const port = 3000;
const itemsPerPage = 10;

server.get("/parcels", (req, res) => {
  const page = req.query.page || 1;
  let queryContent = "SELECT * FROM parcels";
  queryContent += ` LIMIT ${itemsPerPage} OFFSET ${itemsPerPage * page - itemsPerPage}`;

  query(queryContent)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(500).send("Error");
    });
});

server.get("/parcels/:parcelId", (req, res) => {
  query("SELECT * FROM parcels WHERE id = $1 LIMIT 1", [req.params.parcelId])
    .then((data) => {
      if (data.rowCount > 0) {
        res.send(data.rows);
      } else {
        res.status(404).send("Not found");
      }
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(500).send("Error");
    });
});

server.post("/parcels", jsonParser, (req, res) => {
  const { height, width, length } = req.body;

  query("INSERT INTO parcels(height, width, length) VALUES($1, $2, $3) RETURNING *", [
    height,
    width,
    length,
  ])
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(500).send("Error");
    });
});

server.delete("/parcels/:parcelId", (req, res) => {
  query("DELETE FROM parcels WHERE id = $1", [req.params.parcelId]).then((data) => {
    if (data.rowCount > 0) {
      res.send();
    } else {
      res.status(404).send("Not found");
    }
  });
});

server.put("/parcels/:parcelId", jsonParser, (req, res) => {
  const { height, width, length } = req.body;

  query("UPDATE parcels SET height = $1, width = $2, length = $3 WHERE id = $4 RETURNING *", [
    height,
    width,
    length,
    req.params.parcelId,
  ]).then((data) => {
    if (data.rowCount > 0) {
      res.send(data.rows);
    } else {
      res.status(404).send("Not found");
    }
  });
});

server.listen(port, () => console.log(`Listening at http://localhost:${port}`));
