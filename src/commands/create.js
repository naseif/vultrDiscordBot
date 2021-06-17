const create = require("../createInstance");
module.exports = {
  name: "create",
  description: "Creats an instance with your own configuration",
  execute(message, args) {
    create.createInstance(message);
  },
};
