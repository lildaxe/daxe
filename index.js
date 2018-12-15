const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online`)
  let statuse = [
     "I miss the old days",
     "I wish i can go back"
   ]

   setInterval(function() {
     let status = statuse[Math.floor(Math.random() * statuse.length)];
     bot.user.setActivity(status, {type:"PLAYING"});
   }, 5000)


});

bot.login(tokenfile.token);
