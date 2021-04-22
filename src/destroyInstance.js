const vultr = require("./vultrinitializer");
const Discord = require("discord.js");

function destroyInstance(message) {
  let InstanceID;
  vultr.api.instances.listInstances().then((res) => {
    InstanceID = res.instances[0].id;

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

exports.destroyInstance = destroyInstance;
