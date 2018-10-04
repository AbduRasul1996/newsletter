module.exports = {
  sendError: function (res, status, message) {
    res.status(status).json({
      success: false,
      message: message
    });
  }
};
