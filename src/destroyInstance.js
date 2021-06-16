const vultr = require("./vultrinitializer");
const Discord = require("discord.js");
const { vultrAPI } = require("../config.json");

function destroyInstance(message) {
  let InstanceID;
  if (!vultrAPI) {
    message.channel.send(
      `There is no instance to destroy since your API token is not defined!`
    );
    return;
  }
  vultr.api.instances.listInstances().then((res) => {
    if (res.instances.length === 0) {
      message.channel.send(`There are not active instances currently`);
      return;
    } else {
      res.instances.forEach((instance) => {
        InstanceID = instance.id;
        vultr.api.instances.deleteInstance({
          "instance-id": `${InstanceID}`,
        });
        let embedMessageDestroyed = new Discord.MessageEmbed()
          .setTitle("Server Destroyed!")
          .setDescription(`Server with id: ${InstanceID} is destroyed!`)
          .setColor("#0099ff");

        message.channel.send(embedMessageDestroyed);
      });
    }
  });
}

exports.destroyInstance = destroyInstance;
