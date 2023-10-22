require('dotenv/config');
const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL_LOCAL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => console.log("CONNEECTED TO MONGODB!"))
.catch(error => console.log("CONNECTION FAILED!", error));


const port = process.env.PORT || 3001;


app.listen(port, ()=> {
    console.log(`APP RUNNING ON PORT ${port}!`);
});