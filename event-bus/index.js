const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log(event);
  await axios
    .post("http://localhost:4000/events", event)
    .catch((err) => console.log(err));
  await axios
    .post("http://localhost:4001/events", event)
    .catch((err) => console.log(err));
  await axios
    .post("http://localhost:4002/events", event)
    .catch((err) => console.log(err));
  await axios
    .post("http://localhost:4003/events", event)
    .catch((err) => console.log(err));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listening on PORT 4005");
});
