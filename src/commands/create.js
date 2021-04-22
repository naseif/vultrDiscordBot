const create = require("../createInstance");
module.exports = {
  name: "create",
  description: "Creats an instance",
  execute(message, args) {
    create.createInstance(message);
  },
};
