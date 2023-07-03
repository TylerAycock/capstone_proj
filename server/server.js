require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const { SERVER_PORT } = process.env;
const { seed } = require("./seed");

app.get("/", (req, resp) => {
  resp.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/reservations", (req, resp) => {
  resp.status(200).sendFile(path.join(__dirname, "../public/reservations.html"));
});

app.get("/parks", (req, resp) => {
    resp.status(200).sendFile(path.join(__dirname, "../public/parks.html"));
  });

const {
  getCampsites,
  makeReservation,
  showReservation,
  deleteRes,
  getParks,
  getTable
} = require("./controller.js");

app.post("/seed", seed);

//MVP features

app.get("/api/campsites", getCampsites);
app.put("/api/makeres", makeReservation);
app.get("/api/getres", showReservation);
app.delete("/api/delete/:id", deleteRes);
app.get("/api/parks", getParks )
app.get("/api/table", getTable)

app.listen(
  SERVER_PORT,
  console.log(`Gooood morning CAMPER! Server up on ${SERVER_PORT}`)
);
