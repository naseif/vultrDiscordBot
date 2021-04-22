const create = require("../createInstance");
module.exports = {
  name: "create",
  description: "it creates!",
  execute(message, args) {
    create.createInstance(message);
  },
};
