// server/routes/index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('http://localhost:4000/api/');
  res.send({ title: 'hello react!' });
});

module.exports = router;
