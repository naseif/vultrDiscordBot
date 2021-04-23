const vultr = require("./vultrinitializer");
const Discord = require("discord.js");
const {
  server_os,
  server_plan,
  server_region,
  vultrAPI,
} = require("../config.json");

function createInstance(message) {
  if (!vultrAPI) {
    message.channel.send("Your Vultr API token is not defined!");
    return;
  }
  let psswd;
  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle("Creating Server!")
      .setColor("#0099ff")
      .setDescription("This can take up to 10 seconds!")
  );
  function returnInstanceInfo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          vultr.api.instances.listInstances().then((res) => {
            return res;
          })
        );
      }, 9000);
    });
  }

  async function createIns() {
    vultr.api.instances
      .createInstance({
        region: `${server_region}`,
        plan: `${server_plan}`,
        os_id: `${server_os}`,
      })
      .then((res) => {
        psswd = res.instance.default_password;
      });

    const instance = await returnInstanceInfo();
    data = instance.instances[0];

    let embedMessageCreated = new Discord.MessageEmbed()
      .setTitle("Server Created!")
      .addFields(
        { name: "id", value: `${data.id}` },
        {
          name: "IP",
          value: `${data.main_ip}`,
        },
        { name: "Password", value: `${psswd}` },
        { name: "OS", value: `${data.os}` },
        { name: "region", value: `${data.region}` }
      )
      .setColor("#0099ff")
      .setThumbnail(
        "https://imagizer.imageshack.com/v2/150x100q90/923/A8FbcB.png"
      );
    message.channel.send(embedMessageCreated);
  }
  createIns();
}

exports.createInstance = createInstance;
