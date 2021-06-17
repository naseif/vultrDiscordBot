const vultr = require("../vultrinitializer");
const { vultrAPI } = require("../../config.json");

module.exports = {
  name: "destroyall",
  description: "Destroys all running instances!",
  execute(message, args, client, Discord) {
    let InstanceID;
    if (!vultrAPI) {
      message.channel.send(
        `There is no instance to destroy since your API token is not defined!`
      );
      return;
    }
    let idsArray = [];
    vultr.api.instances.listInstances().then((res) => {
      if (res.instances.length === 0) {
        message.channel.send(`There are not active instances currently`);
        return;
      } else {
        res.instances.forEach((instance) => {
          idsArray.push(`Server with id: ${instance.id} is destroyed!`);
          InstanceID = vultr.api.instances.deleteInstance({
            "instance-id": `${instance.id}`,
          });
        });
      }
      let embedMessageDestroyed = new Discord.MessageEmbed()
        .setTitle("Servers Destroyed!")
        .setDescription(idsArray)
        .setColor("#0099ff");

      message.channel.send(embedMessageDestroyed);
    });
  },
};
