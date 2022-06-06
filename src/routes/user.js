const route = require("express").Router();
route.get("/users", (req, res) => {
  res.json({
    message: "mamamia baik anakke",
  });
});

module.exports = route;
