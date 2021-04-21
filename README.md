# vultrDiscordBot

![](https://img.shields.io/github/license/naseif/vultrDiscordBot?color=blue&style=flat-square) ![](https://img.shields.io/github/issues/naseif/vultrDiscordBot?style=flat-square) ![](https://img.shields.io/github/issues-pr/naseif/vultrDiscordBot?style=flat-square)

Vultr is a provider of high-performance SSD (solid-state drive) cloud servers that boast a global footprint. <br/>
vultrDiscordBot is a bot to help you create and destroy servers from vultr directly from Discord.

## Requirements

- Node.js
- NPM

## Installation

First you need to get your own discord Token from the ![Discord Developer Portal](https://discord.com/developers/applications) and add the bot to your server <br/>
Second you need to get your vultr api key from ![vultr](https://my.vultr.com/settings/#settingsapi)

clone the repository and install the modules :

`git clone https://github.com/naseif/vultrDiscordBot.git` <br/>
`cd vultrDiscordBot` <br/>
`npm i`

Now add your discord token to line 4 _client.login("API KEY")_ and your vultr api key to line 6 _apiKey: "API KEY"_

Now simply run : `node index.js`

## Usage

The bot is currently in devolpment and right now only creates this specific instance : <br/>
` region: "ams", plan: "vc2-4c-8gb", os_id: "387",`

This Server is located in Amsterdam, has 4 Cores, 8GB RAM and runs Ubuntu 20.04. This plan costs currently only _0.06$/h_ on vultr <br/>

You can create the server by sending `createS` in any text channels on the server you added the bot to. <br/>

To destroy the instance you created just send `destroyS`

## Contributions

Software contributions are welcome. If you are not a dev, testing and reproting bugs can also be very helpful!

## Questions?

Please open an issue if you have questions, wish to request a feature, etc.
