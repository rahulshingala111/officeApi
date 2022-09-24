const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const schema = require("./schema");

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/firstreactdb", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});
app.get("/", function (req, res) {
  //res.render("/");
});

app.get("/Register", function (req, res) {
  const xyz = schema.find({});
  res.render('/Register',xyz);
});

app.post("/Register", function (req, res) {
  const name = req.body.name;
  const password = req.body.password;
  const occupation = req.body.occupation;
  const newProduct = new schema(req.body);
  newProduct.save();
  console.log(newProduct);
  //res.redirect("/Home");
});

app.get("/Login", async (req, res) => {
  // const name = req.body.name;
  // const password = req.body.password;
  // const occupation = req.body.occupation;
  // const newProduct = new schema(req.body);
  // newProduct.save();
  // console.log(newProduct);
  //res.render("/Login", { data });
  let posts = schema.find({}, function(err, posts){
    if(err){
        console.log(err);
    }
    else {
        res.json(posts);
    }
});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
