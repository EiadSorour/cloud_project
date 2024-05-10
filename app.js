const express = require("express");
const cors = require("cors")
const { Sequelize, DataTypes } = require("sequelize")

const app = express();
app.use(express.static("./frontend"))
app.use(cors())

const studentsData = [
    {
        ID: 2203176,
        Name: "Eiad Tarek Ali",
        Age: 21,
        Hours: 55,
        CGPA: 3.8,
    },
    {
        ID: 22012038,
        Name: "Mazen Yasser Asran",
        Age: 23,
        Hours: 54,
        CGPA: 2.9,
    },
    {
        ID: 22010460,
        Name: "Ziad Magdy Salah",
        Age: 21,
        Hours: 56,
        CGPA: 3.2,
    },
    {
        ID: 22012048,
        Name: "Fares Mohamed Mohamed",
        Age: 21,
        Hours: 54,
        CGPA: 2.77,
    },
    {
        ID: 22010454,
        Name: "Sief Shreif Fathy",
        Age: 21,
        Hours: 54,
        CGPA: 3, 
    },
]

const sequelize = new Sequelize('students', 'team', 'password123', {
    host: 'postgres',
    dialect: 'postgres'
});

const Students = sequelize.define(
    'students',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CGPA: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    },
);


async function connect(){
    await sequelize.authenticate();
    console.log("Connected to DB");
    await Students.sync()

    const oldData = await Students.findAll();

    if(oldData.length === 0){
        studentsData.forEach( async (student) => {
            await Students.create(student)
        });
    } 
} 

connect()


app.get("/deleteAllStudents", async(req,res)=>{

    const oldData = await Students.findAll();

    if(oldData.length === 0){
        res.send("Table is already empty")
    }else{
        await Students.truncate()
        res.send("Deleted Successfully")
    }

})


app.get("/addAllStudents" , async (req,res)=>{
    const oldData = await Students.findAll();

    if(oldData.length === 0){
        studentsData.forEach( async (student) => {
            await Students.create(student)
        });
        res.send("Data added successfully")
    }else{
        res.send("Data is already existed")
    }
})

app.get("/getAllStudents", async (req,res)=>{

    const oldData = await Students.findAll();

    if(oldData.length === 0){
        res.send("not found")
    }else{
        const data = await Students.findAll();
        res.send(data)
    } 
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})


