const mongoose = require ("mongoose");
const logger = require("../utils/logger");
const connectionString = "mongodb+srv://" +
                            `${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
                            `@cluster0-isjpg.mongodb.net/${process.env.DB_NAME}` +
                            "?retryWrites=true&w=majority"; 

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    logger.info("Connectie met MongoDB is gelegd.");  //was: console.log("Connectie met MongoDB is gelegd."); na lijn 2
}).catch(err =>{
    console.log(err.stack),
    process.exit(1);
});