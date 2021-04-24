const vultr = require("./vultrinitializer");
const Discord = require("discord.js");
const {
  server_os,
  server_plan,
  server_region,
  vultrAPI,
} = require("../config.json");
const ssh = require("./createSSHConnection");

function createInstance(message) {

  if (!vultrAPI) {
    message.channel.send("Your Vultr API token is not defined!");
    return;
  }

  let serverPassword;
  let data;

  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle("Creating Server!")
      .setColor("#0099ff")
      .setDescription("This can take up to 10 seconds!")
  );

  vultr.api.instances.createInstance({ region: `${server_region}`, plan: `${server_plan}`, os_id: `${server_os}` })
  .then((result) => {
    serverPassword = result.instance.default_password;
    
    return new Promise((resolve) => { setTimeout(() => { resolve(); }, 12000); });
  })
  .then((result) => vultr.api.instances.listInstances())
  .then((result) => {
    data = result.instances[0];

    let embedMessageCreated = new Discord.MessageEmbed()
      .setTitle("Server Created!")
      .addFields(
        { name: "id", value: `${data.id}` },
        {
          name: "IP",
          value: `${data.main_ip}`,
        },
        { name: "Password", value: `${serverPassword}` },
        { name: "OS", value: `${data.os}` },
        { name: "region", value: `${data.region}` }
      )
      .setColor("#0099ff");
    message.channel.send(embedMessageCreated);

    return new Promise((resolve) => { setTimeout(() => { resolve(); }, 60000); });
  })
  .then((result) => {
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Installing Server applications from setup.sh`)
        .setColor("#0099ff")
        .setDescription(
          "This installation might take a few minutes. Go grab a cup of coffee 😄 "
        )
    );

    return ssh.sshToServer(data.main_ip, serverPassword);
  })
  .then((result) => {
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Installation completed!")
        .setDescription(
          "Installation of setup.sh is now completed! 😍 "
        )
        .setColor("#0099ff")
    );
  });

}

exports.createInstance = createInstance;
