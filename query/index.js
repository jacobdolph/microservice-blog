const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);
  if (type === "PostCreated") {
    const { id, title } = data;
    const comments = new Array();

    posts[id] = { id, title, comments };

    console.log(posts[id]);
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = posts[postId];

    post.comments.push({ id, content });
  }
  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening on PORT 4002");
});
