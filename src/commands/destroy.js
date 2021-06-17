const destroy = require("../destroyInstance");
module.exports = {
  name: "destroy",
  description: "Destroys an instance by ID",
  execute(message, args) {
    if (!args[0])
      return message.channel.send("You need to Provide an Instance ID!");
    destroy.destroyInstance(message, args[0]);
  },
};
