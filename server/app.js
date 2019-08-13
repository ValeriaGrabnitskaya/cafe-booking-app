const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const OpenTime = require('./DB/OpenTime');
const PlacesTypes = require('./DB/PlacesTypes');

const placesRouter = require('./routes/placesRouter');

let app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get("/get-open-time", function (req, res) {
    res.send(OpenTime);
});

app.get("/get-places-types", function (req, res) {
    res.send(PlacesTypes);
});

app.use("/places", placesRouter);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});