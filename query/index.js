const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    const comments = new Array();

    posts[id] = { id, title, comments };

    console.log(posts[id]);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    console.log(postId);

    const post = posts[postId];
    console.log(posts[postId]);
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type);

  handleEvent(type, data);

  console.log(posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening on PORT 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
});
