const VultrNode = require("@vultr/vultr-node");
const { vultrAPI } = require("../config.json");
const api = VultrNode.initialize({ apiKey: `${vultrAPI}` });

exports.api = api;
