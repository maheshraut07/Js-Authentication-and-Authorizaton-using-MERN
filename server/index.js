const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const { mongo } = require("mongoose");
const employeeModel = require('./DbModels/employee.model')

const app = express();
app.use(express.json())   // it is used for just trnasporting the data from the front end in the format of json 
app.use(cors())


// it is the method to connect our app to the database 
mongoose.connect("mongodb://127.0.0.1:27017/employee")


//so we have to  post the request 

// req is the data coming from the frontend 
// and res is the response sent to the frontend from the backend 


app.post('/', async (req, res) => {
    try{
    const {Name , Email , Password} = req.body;  // it will take data from the "/" route and will take data from the body by using req.body method 
                                                  // in the variables Name, Email , Password 
    
    const User = await employeeModel.create({        // it will create user model with the values entered by the user 
        name:Name,
        email:Email,
        password:Password
    }); 

    console.log(User); // to check if the user have entered the information or not 

    if(!User){
        res.status(400).json({
            err:"Registration error"
        })
    }else{
        res.status(200).json({        // it will send the result to the frontEnd signup page 
            Name:User.name,
            Email:User.email,
            userId:User._id
        })
    }
    }catch(err){
        console.log("R",err);
    }
    
})


// post request for the Login page 
app.post("/Login", (req, res) => {
    const { email, password } = req.body;
    employeeModel.findOne({ email: email.trim() })
        .then(user => {
            if (user) {
                if (user.password === password.trim()) { // Ensure password comparison is not case-sensitive
                    res.json("Success");
                } 
                else {
                    res.json("The password is incorrect");
                }
            } 
            else {
    
                res.json("No Record existed");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json("Internal Server Error");
        });
});

// it is the method to start the server 

app.listen(3002, () => {
    console.log("server is running on the port 3002")
})

