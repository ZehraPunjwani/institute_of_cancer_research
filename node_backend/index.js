const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./utils/routes')(app);

app.listen(port, () => {
    console.log(`running on port ${port}.`);
});
