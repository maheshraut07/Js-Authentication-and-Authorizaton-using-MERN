const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema(
    {
        name : String,
        email : String,
        password: String,
    }
)

const employeeModel = mongoose.model("employees",employeeSchema)  // it will create model (database) based on "employeeSchema"

module.exports = employeeModel 