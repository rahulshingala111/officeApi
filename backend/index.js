const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const schema = require('./schema');

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/firstreactdb',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})
app.get('/',function(req,res){
    res.send({
        message:"Home page"
    })
})

// app.get('/getdata',function(req,res){
//     res.send({
//         status:true,
//         message:"Get api called!!"
//     })
// })
app.get('/Login',function(req,res){
   res.render('/Login');

})
app.post('/Login',function(req,res){


    const name = req.body.name;
    const password = req.body.password;
    const occupation = req.body.occupation;
    // console.log(name);
    // console.log(password);
    // console.log(occupation);
    
})



const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening to Port ${port}`)
})