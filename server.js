'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { encrypt, decrypt } = require('./encryption');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  const encryptedText = encrypt(text);
  res.send(`Encrypted Text: ${encryptedText}`);
});

app.post('/decrypt', (req, res) => {
  const { text } = req.body;
  try {
    const decryptedText = decrypt(text);
    res.send(`Decrypted Text: ${decryptedText}`);
  } catch (error) {
    res.status(400).send('Invalid encrypted text.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
