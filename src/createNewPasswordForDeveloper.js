const fs = require("fs");
const shellOriginPath = __dirname + "/shell/setup.sh";
const shellOutput = __dirname + "/setup.sh";
let userDevPassword = randomPassword();

function randomPassword() {
  const allPossibleCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?!";
  const maximalLength = 18;
  let result = "";

  for (let i = 0; i < maximalLength; i++) {
    const randomNumber = Math.floor(
      Math.random() * allPossibleCharacters.length
    );
    result += allPossibleCharacters[randomNumber];
  }
  return result + "\\n" + result;
}

function executeShellAndCreatePassword() {
  let data = fs.readFileSync(shellOriginPath, "utf-8");

  let newValue = data.replace(
    "randomPassword\\nrandomPassword",
    userDevPassword
  );

  fs.writeFileSync(shellOutput, newValue, "utf-8");
  console.log("Created new setup.sh");
}
exports.userDevPassword = userDevPassword;
exports.executeShellAndCreatePassword = executeShellAndCreatePassword;
exports.randomPassword = randomPassword;
