const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const client = new Discord.Client();
let commands = (client.commands = new Discord.Collection());

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  // not for us ...
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // not one of our commands ...
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, client, Discord);
  } catch (err) {
    console.error(err);
    message.reply("Command Unknown! Try Again!");
  }
});

client.login(token);
exports.commands = commands;
