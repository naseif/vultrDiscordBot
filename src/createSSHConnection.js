const Client = require("ssh2").Client;
const conn = new Client();
const Discord = require("discord.js");

function sshToServer(host, password) {
  return new Promise(
    (resolve) => {

      conn.on("ready", function () {
        console.log("Client :: ready");
        conn.shell(function (err, stream) {

          if (err) throw err;

          stream
            .on("close", function () {
              console.log("Stream :: close");
              conn.end();
              resolve();
            })

            .on("data", function (data) {
              console.log("OUTPUT: " + data);
            });

          stream.end(
            `wget https://raw.githubusercontent.com/Michelangelo1337/create-working-environment-for-js-on-ubuntuserver/main/setup.sh && chmod +x setup.sh && ./setup.sh && exit\n`
          );

        });
      })
      .connect({
        host: `${host}`,
        port: 22,
        username: "root",
        password: `${password}`,
      });

    });
}

exports.sshToServer = sshToServer;
