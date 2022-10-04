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

const isAuthenticated = (req, res, next) => {
  // let isUserAuthenticated = true;

  // const authHeader = req.get("Authorization");
  // console.log(authHeader);
  // if (!authHeader) {
  //   res.status(401).send("Not Authenticated");
  // }
  // let token = authHeader.split(" ")[1];
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, "jwtSecret");
  //   console.log(decodedToken);
  // } catch (error) {
  //   console.log(error);
  // }
  // console.log(`TOCKEN ${token}`);

  // if (isUserAuthenticated) {
  //   next();
  // } else {
  //   throw new Error("User not exist");
  // }
  const bearerHeader = req.get("Authorization");
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};
app.get("/Login", function (req, res) {
  //res.render("/Login");
  // const token = req.headers.authorization.split(" ")[1];
  //  Authorization: "Bearer TOKEN";
  // if (!token) {
  //   res
  //     .status(200)
  //     .json({ auth: false, message: "Error! Token was not provided." });
  // }
  //Decoding the token
  // const decodedToken = jwt.verify(token, "jwtSecret");
  // res.status(200).json({
  //   auth: false,
  //   message: "SUccess",
  // });
});

app.post("/Login", isAuthenticated, async (req, res) => {
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
                          const name = req.body.name;
                          const password = req.body.password;
                          const occupation = req.body.occupation;
                          const token = jwt.sign(
                            { name, password, occupation },
                            "jwtSecret",
                            {
                              expiresIn: 300,
                            }
                          );
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
});

app.get("/Login/protected", isAuthenticated, (req, res) => {
  jwt.verify(req.token, "jwtSecret", (err, data) => {
    if (err) {
      res.json({ 
        message: "unauthorized",
        status: 403 
      });
    } else {
      res.json({
        text: "this is Protected",
        data: data,
      });
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
  const abc = schema.findOne({ name: req.body.name }, (err, suc) => {
    if (err) {
      console.log(err);
    } else {
      if (suc === null) {
        const newname = new schema(req.body.name);
        newname.save();
        console.log(newname);
      } else {
        console.log("USERNAME = CORRECT");
      }
    }
  });
  const newProduct = new schema(req.body);
  newProduct.save();
  console.log(newProduct);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
