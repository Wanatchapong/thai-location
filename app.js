const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const provinces = require('./routes/provinces');
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/provinces', provinces);

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});