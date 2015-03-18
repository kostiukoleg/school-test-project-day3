module.exports = {
  "get": {
    "/hello": require("./controllers/helloController").getAction
  }
};
