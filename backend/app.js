const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const signupRouter = require('./routes/signupRouter');
const signinRouter = require('./routes/signinRouter');
const addProductrouter = require('./routes/addProductRouter')
const productgetRouter = require('./routes/productgetRouter')
const importProductRouter = require("./routes/importProductRouter");
const sellProductRouter = require("./routes/sellProductRouter");
const app = express();

app.use(bodyParser.json(
  {
    origin: 'https://inventory-managemenmt-deploy.vercel.app',
  }
));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", sellProductRouter);

app.use("/api", importProductRouter); 

app.use('/api', signupRouter);

app.use('/api', signinRouter);

app.use('/api', addProductrouter);

app.use('/api', productgetRouter); 




module.exports = app;
