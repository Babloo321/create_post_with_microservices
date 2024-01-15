const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
    const event = req.body;
    axios.post("http://localhost:5000/events", event);      // post service
    axios.post("http://localhost:5001/events", event);      // comment service
    axios.post("http://localhost:5002/events", event);      // query service
    axios.post("http://localhost:5003/events", event);

    res.send({status: "OK"});
})

app.listen(5005, () => {
    console.log("event-bus is listening on 5005 Port!");
})