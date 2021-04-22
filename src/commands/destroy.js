const destroy = require("../destroyInstance");
module.exports = {
  name: "destroy",
  description: "Destroys an instance",
  execute(message, args) {
    destroy.destroyInstance(message);
  },
};
