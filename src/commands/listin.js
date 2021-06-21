const vultr = require("../vultrinitializer");
const { vultrAPI } = require("../../config.json");

module.exports = {
  name: "listin",
  description: "Lists all running and available Instances from Vultr",
  execute(message, args, client, Discord) {
    if (!vultrAPI) {
      message.channel.send(
        `You can't get a list of Instances since your API token is not defined!`
      );
      return;
    }
    let availableInstances = [];
    vultr.api.instances.listInstances().then((data) => {
      data.instances.forEach((activeInstance) => {
        availableInstances.push(
          `Instance ID : **${activeInstance.id}** - OS : ${activeInstance.os} - Region : ${activeInstance.region}`
        );
      });
      const InstancesEmbed = new Discord.MessageEmbed()
        .setTitle("List of Active Instances")
        .setColor("#0099ff")
        .setDescription(availableInstances);
      message.channel.send(InstancesEmbed);
    });
  },
};
