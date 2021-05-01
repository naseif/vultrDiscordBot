# vultrDiscordBot

![](https://img.shields.io/github/license/naseif/vultrDiscordBot?color=blue&style=flat-square) ![](https://img.shields.io/github/issues/naseif/vultrDiscordBot?style=flat-square) ![](https://img.shields.io/github/issues-pr/naseif/vultrDiscordBot?style=flat-square)

Vultr is a provider of high-performance SSD (solid-state drive) cloud servers that boast a global footprint. <br/>
vultrDiscordBot is a bot to help you create and destroy servers from vultr directly from Discord.

## Requirements

- Node.js
- NPM

## Installation

First you need to get your own discord Token from the [Discord Developer Portal](https://discord.com/developers/applications) and invite the bot to your server <br/>
Second you need to get your vultr api key from [vultr](https://my.vultr.com/settings/#settingsapi)

clone the repository and install the modules :

`git clone https://github.com/naseif/vultrDiscordBot.git` <br/>
`cd vultrDiscordBot` <br/>
`npm i`

## Usage

First, rename `config.example.json` to `config.json`. Now open the `config.json` file and add your discord and vultr API tokens. <br/>
Specify your own prefix that the bot should listen to e.g "!" and server specs like below <br/> 

```js
{
    "prefix": "", // "!" e.g
    "token": "",
    "vultrAPI": "",
    "server_os": "",  // e.g "378" which is Ubuntu 20.04 x64
    "server_plan": "", // e.g "vc2-1c-1gb" 1 Core, 1GB RAM Server
    "server_region": "" // e.g "ams" Amsterdam
  }
```
For `server_os, server_plan and server_region` you always need to pass the id. You can get the id for each from vultr API here : [plans](https://api.vultr.com/v2/plans), [regions](https://api.vultr.com/v2/regions), [OS](https://api.vultr.com/v2/os)

After you have configured the json file simply run : `node index.js`

You can create the server by sending `!create` in any text channels on the server you added the bot to. <br/>

To destroy the instance you created just send `!destroy`

## Contributions

Software contributions are welcome. If you are not a dev, testing and reproting bugs can also be very helpful!

## Questions?

Please open an issue if you have questions, wish to request a feature, etc.
