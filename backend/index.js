const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const schema = require("./schema");
// app.set("view engine", "html");
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());

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
  res.render("/");
});
app.get("/Private",(req,res)=>{
  res.render("/Private");
})


app.get("/Register", function (req, res) {
  res.render("/Register");
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

app.get("/Login", (req, res) => {
  res.render("register");
});
app.post("/Login", (req, res) => {
  const { name, password, occupation } = req.body;
  console.log("___________________");

  const abc = schema.findOne({ name: req.body.name }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      if (suc === null) {
        console.log("USERNAME = INCORRECT");
      } else {
        console.log("USERNAME = CORRECT");res.render("/Private");
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
        console.log("PASSWORD = CORRECT");res.render("/Private");
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
          console.log("OCCUPATION = CORRECT");res.render("/Private");
        }
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
