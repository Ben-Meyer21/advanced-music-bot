const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Advanced Music Bot is READY!")
})

app.listen(3000, () => {
  console.log("Project is ready!")
})

require("dotenv").config();
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.queue = new Map()

client.config = {
  prefix: process.env.PREFIX,
  YOUTUBE: process.env.YOUTUBE_CLIENT_ID
}

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.login(process.env.TOKEN)
