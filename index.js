const Discord = require("discord.js");
const VultrNode = require("@vultr/vultr-node");
const client = new Discord.Client();
client.login(""); // Your Discord Token
const vultr = VultrNode.initialize({
  apiKey: "", // Your vultr API Key
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
let data;
client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "createS") {
    let psswd;
    msg.reply(
      new Discord.MessageEmbed()
        .setTitle("Creating Server!")
        .setColor("#0099ff")
        .setDescription("This can take up to 10 seconds!")
    );
    function returnInstanceInfo() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            vultr.instances.listInstances().then((res) => {
              return res;
            })
          );
        }, 9000);
      });
    }

    async function createAMS() {
      vultr.instances
        .createInstance({
          region: "ams",
          plan: "vc2-4c-8gb",
          os_id: "387",
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
          { name: "OS", value: `${data.os}` }
        )
        .setColor("#0099ff")
        .setThumbnail(
          "https://imagizer.imageshack.com/v2/150x100q90/923/A8FbcB.png"
        );
      msg.reply(embedMessageCreated);
    }

    createAMS();
  }

  if (msg.content === "destroyS") {
    vultr.instances.listInstances().then((res) => {
      id = res.instances[0].id;

      vultr.instances.deleteInstance({
        "instance-id": `${id}`,
      });

      let embedMessageDestroyed = new Discord.MessageEmbed()
        .setTitle("Server Destroyed!")
        .setDescription(`Server with id: ${id} is destroyed!`)
        .setColor("#0099ff");

      msg.reply(embedMessageDestroyed);
    });
  }
});
