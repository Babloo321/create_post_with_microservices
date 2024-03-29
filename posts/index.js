const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

 await axios.post("http://localhost:5005/events", {
    type: "PostCreated",
    data: {
      id, title
    }
  })
  res.status(201).send(posts[id]);
});

// receive an event which comming from event-bus
app.post('/events', (req, res) => {
  console.log("Successfully received events inside the POST service: ", req.body.type);

  console.log("Id: ", req.body.data.id);
  console.log("Title: ", req.body.data.title);

  res.send({});
})
app.listen(5000, () => {
  console.log("Post is listening on 5000 Port!");
});
