const vultr = require("../vultrinitializer");
const { vultrAPI } = require("../../config.json");

module.exports = {
  name: "listos",
  description: "Lists all available Operating Systems at Vultr",
  execute(message, args, client, Discord) {
    if (!vultrAPI)
      return message.channel.send(
        `You can't get The List since your API token is not defined`
      );
    let operatingSystemArray = [];

    vultr.api.operatingSystems.listImages().then((data) => {
      if (!data)
        return message.channel.send(
          "Something is wrong! Please check that you have your API key set up OR that your IP is whitelisted in your vultr Account"
        );
      data.os.forEach((system) => {
        operatingSystemArray.push(
          `Name : ${system.name} - OS ID : **${system.id}** - Arch : **${system.arch}**`
        );
      });

      const osEmbed = new Discord.MessageEmbed()
        .setTitle("List of All available Operating Systems")
        .setColor("#0099ff")
        .setDescription(operatingSystemArray);

      message.channel.send(osEmbed);
    });
  },
};
