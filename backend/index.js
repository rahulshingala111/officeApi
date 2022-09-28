const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get("/Login", function (req, res) {
  res.render("/Register");
});

app.post("/Login", function (req, res) {
  const { name, password, occupation } = req.body;
  console.log("______________");
  console.log(req.body.name);
  console.log(req.body.password);
  console.log(req.body.occupation);

  const abc = schema.findOne({ name: req.body.name }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      if (suc === null) {
        console.log("USERNAME = INCORRECT");
      } else {
        console.log("USERNAME = CORRECT");
      }
    }
  });
  const dfg = schema.findOne({ password: req.body.password }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      if (suc === null) {
        console.log("PASSWORD = INCORRECT");
      } else {
        console.log("PASSWORD = CORRECT");
      }
    }
  });
  const hik = schema.findOne(
    { occupation: req.body.occupation },
    (err, suc) => {
      if (err) {
        console.log(err);
      } else {
        if (suc === null) {
          console.log("OCCUPATION = INCORRECT");
        } else {
          console.log("OCCUPATION = CORRECT");
        }
      }
    }
  );
});
app.get("/", function (req, res) {
  res.render("/");
});
app.get("/Register", function (req, res) {
  res.render("/Register");
});

app.post("/Register", function (req, res) {
  const newProduct = new schema(req.body);
  newProduct.save();
  console.log(newProduct);
  //res.redirect("/Home");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
