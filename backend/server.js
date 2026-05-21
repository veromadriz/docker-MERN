const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.json(saved);
});

app.listen(PORT, () => {
  console.log('Servidor corriendo');
});