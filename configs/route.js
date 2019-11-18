module.exports = app => {
  app.use("/auth", require("../controllers/auth.controller"));
};
