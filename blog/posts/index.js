const express = require("express");
//' 解析器
const bodyParser = require("body-parser");
//' 生成一个随机的 id
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json()); // ?

//'存储从 posts 中的数据
const posts = {};

//-接受从 posts 发送的数据并作出响应
app.get("/posts", (req, res) => {
  res.send(posts); //=> 当有人申请时返回所有的已创建的 posts
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    //' 定义返回的 id
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on 4000 ");
});
