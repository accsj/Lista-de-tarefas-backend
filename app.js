const express = require("express");
const bodyParser = require("body-parser");
const login = require ('./routes/Auth/login');
const register = require('./routes/Register/register');
const tasklist = require("./routes/TaskList/tasklist");
const addtask = require("./routes/TaskAdd/taskadd");
const taskdel = require("./routes/TaskDel/taskdel");
const recovery = require("./routes/Recovery/recovery");
const passrecovery = require("./routes/PassRecovery/passrecovery");
const cors = require("cors");
const app = express();


// Configs
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


// Pages Auth Routes
app.get("/", (req,res) => {
    res.send("Servidor funcionando para fazer requisições!")
})
app.use('/', login)
app.use("/", register)
app.use("/", tasklist)
app.use("/", addtask)
app.use("/", taskdel)
app.use("/", recovery)
app.use("/", passrecovery)



app.listen(process.env.PORT || 5000,  ()=> {
    console.log("Servidor rodando na porta", process.env.PORT);
})