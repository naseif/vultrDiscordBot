const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();
const setupShell = __dirname + "/setup.sh";

function sshToServer(host, password) {
  return new Promise(function (resolve) {
    ssh
      .connect({
        host: host,
        username: "root",
        password: password,
      })
      .then(function () {
        return ssh.putFile(setupShell, "/root/setup.sh").then(
          function () {
            console.log("Setup.sh Copied to remote Server!");
          },
          function (err) {
            console.log("File could not be transfered!");
            console.log(err);
          }
        );
      })
      .then(function () {
        ssh
          .execCommand("chmod +x setup.sh && ./setup.sh && exit", {
            cwd: "/root",
          })
          .then(function () {
            resolve();
          });
      });
  });
}

exports.sshToServer = sshToServer;
