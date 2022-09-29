const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema");
const jwt = require("jsonwebtoken");
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
  res.render("/Login");
});

app.post("/Login", async (req, res) => {
  const abc = schema.findOne({ name: req.body.name }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      if (suc === null) {
        console.log("USERNAME = INCORRECT");
      } else {
        const dfg = schema.findOne(
          { password: req.body.password },
          (err, suc) => {
            if (err) {
              console.log(err);
            } else {
              if (suc === null) {
                console.log("PASSWORD = INCORRECT");
              } else {
                const hik = schema.findOne(
                  { occupation: req.body.occupation },
                  (err, suc) => {
                    if (err) {
                      console.log(err);
                    } else {
                      if (suc === null) {
                        console.log("OCCUPATION = INCORRECT");
                      } else {
                        console.log("DATA CORRECT");

                        if (suc) {
                          const id = req.body._id;
                          const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                          });
                          res.json({ auth: true, token: token, suc: suc });
                        } else {
                          res.json({
                            auth: false,
                            message: "Wrong username/password",
                          });
                        }
                      }
                    }
                  }
                );
              }
            }
          }
        );
      }
    }
  });

  const jkl = schema.findOne({ id: req.body._id }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
});
app.get("/", function (req, res) {
  res.render("/");
});
app.get("/Register", function (req, res) {
  res.render("/Register");
});

app.post("/Register", function (req, res) {
  // const abc = schema.findOne({ name: req.body.name }, (err, suc) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (suc === null) {
  //       const newname = new schema(req.body.name);
  //       newname.save();
  //       console.log(newname);
  //     } else {
  //       console.log("USERNAME = CORRECT");
  //     }
  //   }
  // });
  const newProduct = new schema(req.body);
  newProduct.save();
  console.log(newProduct);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
