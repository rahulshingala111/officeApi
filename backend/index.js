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
    res.render('/');
})

app.get('/Register',function(req,res){
   res.render('/Register');

})
app.post('/Register',function(req,res){

    const name = req.body.name;
    const password = req.body.password;
    const occupation = req.body.occupation;
    const newProduct = new schema(req.body)
    newProduct.save();
    console.log(newProduct)
    res.redirect('/')
})



// app.get('/Login', function(req, res, next) {
//     res.render('index', { title: 'add user' });
//   });
   
//   app.post('/Login', function(req, res, next) {
       
//       req.assert('name', 'Name is required').notEmpty()           //Validate name
//       req.assert('email', 'A valid email is required').isEmail()  //Validate email
    
//       var errors = req.validationErrors()
       
//       if( !errors ) {   //No errors were found.  Passed Validation!
           
       
//         var userDetails = new userModel({
//           name: req.body.name,
//           email: req.body.email,
//         });
         
//         userDetails.save((err, doc) => {
//               if (!err)
//                   req.flash('success', 'User added successfully!');
//                   res.redirect('/');
//               else
//                   console.log('Error during record insertion : ' + err);
//         });
     
//       }
//       else {   //Display errors to user
//           var error_msg = ''
//           errors.forEach(function(error) {
//               error_msg += error.msg + '<br>'
//           })                
//           req.flash('error', error_msg)        
           
//           res.render('/', { 
//               title: 'Add New User',
//               name: req.body.name,
//               email: req.body.email
//           })
//       }
//   });
   



const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening to Port ${port}`)
})