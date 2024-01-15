const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentsId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentByPostId[req.params.id] || [];
  comments.push({ id: commentsId, content, status: "pending" });
  commentByPostId[req.params.id] = comments;

  await axios.post("http://localhost:5005/events", {
    type: "CommentCreated",
    data: {
      id: commentsId,
      content,
      postId: req.params.id,
      status: "pending"
    },
  });
  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Successfully received events inside the COMMENT service: ", req.body.type);
  
  const {type, data} = req.body;
  if(type === "CommentModerated"){
    const {id, postId, status, content} = data;
    const comments = commentByPostId[postId];
    const comment = comments.find(comnt => comnt.id === id);
    comment.status = status;

    await axios.post('http://localhost:5005/events', {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      }
    });
  }

  res.send({});
})

app.listen(5001, () => {
  console.log("Comment is listening on 5001 Port!");
});
