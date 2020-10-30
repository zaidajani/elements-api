const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongoDb');
}).catch((ex) => {
    console.error('Error: ', ex);
});

const port = process.env.PORT || 3000;

const schema = new mongoose.Schema({
    "Atomic_Number": String,
    "Atomic_Mass": String,
    "Chemical_Element_Name": String,
    "Symbol": String,
    "Discovery": String,
    "Group": String
});

const Model = mongoose.model('elements', schema);

app.get('/', async (req, res) => {
    const data = await Model.find();
    res.send(data);
});

app.get('/:name', async (req, res) => {
    const name = req.params.name;
    const element = await Model.findOne({ "Chemical_Element_Name": { $eq: name } });

    res.send(element);
});

app.get('/findBySymbol/:symbol', async (req, res) => {
    const element = await Model.findOne({ "Symbol": { $eq: req.params.symbol } });

    res.send(element);
});

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});