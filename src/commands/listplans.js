const vultr = require("../vultrinitializer");
const { vultrAPI } = require("../../config.json");

module.exports = {
  name: "listplans",
  description: "Lists available Plans by OS name and type or list all plans",
  execute(message, args, client, Discord) {
    if (!vultrAPI)
      return message.channel.send(
        `There is no instance to destroy since your API token is not defined!`
      );
    let plansArray = [];
    if (!args[0]) {
      vultr.api.plans.listPlans().then((data) => {
        if (!data)
          return message.channel.send(
            "Something is wrong! Please check that you have your API key set up OR that your IP is whitelisted in your vultr Account"
          );
        data.plans.forEach((plan) => {
          plansArray.push(
            `CPU: ${plan.vcpu_count} Core/s - RAM: **${
              plan.ram / 1024
            }GB** - Drive: **${plan.disk}GB** - ID: **${plan.id}** `
          );
        });

        const plansEmbed = new Discord.MessageEmbed()
          .setTitle("List of All available Operating Systems")
          .setColor("#0099ff")
          .setDescription(plansArray);

        message.channel.send(plansEmbed);
      });
    } else {
      vultr.api.plans.listPlans({ os: args[0], type: args[1] }).then((data) => {
        if (!data)
          return message.channel.send(
            "Something is wrong! Please check that you have your API key set up OR that your IP is whitelisted in your vultr Account"
          );
        data.plans.forEach((plan) => {
          plansArray.push(
            `CPU: ${plan.vcpu_count} Core/s - RAM: **${
              plan.ram / 1024
            }GB** - Drive: **${plan.disk}GB** - ID: **${plan.id}**  `
          );
        });

        const planswithOSEmbed = new Discord.MessageEmbed()
          .setTitle("List of All available Operating Systems")
          .setColor("#0099ff")
          .setDescription(plansArray);

        message.channel.send(planswithOSEmbed);
      });
    }
  },
};
