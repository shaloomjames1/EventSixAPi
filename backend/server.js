    // imports for the server 
    const express = require("express");
    const app = express();
    require("dotenv").config(); 
    const bodyParser = require("body-parser");
    const cors = require('cors');
    const { ConnectDB } = require("./config/Db");

    const corsOptions = {
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
        credentials: true,
    };

    // middlewares
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors(corsOptions));

    // routes 
    app.use("/api/useraccount",require("./routers/userAccountRoute"));

    // running the server on port by checking if the Connection is successfull with database Atlas  
    const Port =  5000;
    ConnectDB().then(()=>{
        app.listen(Port,()=>{
            console.log(`Server successfully running on port no http://localhost:${Port}/`)
        })
    })
