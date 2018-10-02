const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
    method: "GET"
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
    method: "POST"
  });
});

router.patch('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
    method: "PATCH"
  });
});

router.delete('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
    method: "DELETE"
  });
});

router.put('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World",
    method: "PUT"
  });
});

module.exports = router;
