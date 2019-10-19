const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const http = require("http");
const helmet = require("helmet");
const session = require("express-session");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const server = http.createServer(app);
var io = require("socket.io")(server);
var db = require("./plugins/Tools");
var index = require("./ROUTES/index");

app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

app.set("port", process.env.port || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(index);
const urlencodedParser = express.urlencoded({ extended: true });
const jsonParser = express.json();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

server.listen(app.get("port"), () => {
  console.log("App listening to port %d", app.get("port"));
});

db.importDatabases();
//db.importUsers();
