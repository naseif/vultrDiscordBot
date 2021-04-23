const Client = require("ssh2").Client;
const conn = new Client();
const Discord = require("discord.js");

function sshToServer(message, host, password) {
  conn
    .on("ready", function () {
      console.log("Client :: ready");
      conn.shell(function (err, stream) {
        if (err) throw err;
        stream
          .on("close", function () {
            console.log("Stream :: close");
            message.channel.send(
              new Discord.MessageEmbed()
                .setTitle("Installation compeleted!")
                .setDescription(
                  "Installation of setup.sh is now completed! 😍 "
                )
                .setColor("#0099ff")
            );
            conn.end();
          })
          .on("data", function (data) {
            console.log("OUTPUT: " + data);
          });
        stream.end(
          `wget https://raw.githubusercontent.com/stho32/create-working-environment-for-js-on-ubuntuserver/main/setup.sh && chmod +x setup.sh && ./setup.sh && exit` +
            "\nexit\n"
        );
      });
    })
    .connect({
      host: `${host}`,
      port: 22,
      username: "root",
      password: `${password}`,
    });
}

exports.sshToServer = sshToServer;
