const cors = require("cors");

const express = require("express");
const RouterHostel = require("./routers/hostel");
require("./db/sequelize");
const RouterComment = require("./routers/comment");
const RouterRate = require("./routers/rate");

const RouterUser = require("./routers/user");
const adminRouter = require("./routers/admin");
const msg = require("./routers/message");

const app = express();

const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

require("./models/connections");

app.use(cors());
app.use(RouterHostel);
app.use(RouterComment);
app.use(RouterRate);
app.use(RouterUser);
app.use(adminRouter);
app.use(msg);

app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname+"/public/index.html");
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
