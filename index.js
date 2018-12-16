const tokenfile = require("./token.json");
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const settings = require("./your_settings.json");
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

bot.on("message", async message => {

   if(message.author.bot) return;
   if(message.channel.type === "dm") return;

   let prefix = botconfig.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);
   let commandfile = bot.commands.get(cmd.slice(prefix.length));
   if(commandfile) commandfile.run(bot,message,args);

   if(cmd === settings.prefix + settings.rainbowcommand) {
       const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [0])
       if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
       if(!message.guild.member(bot.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
       var colors = settings.rainbowrole
       var rolestart = setInterval(function() {
           var colorsz = colors[Math.floor(Math.random() * colors.length)];
           rolez.setColor(colorsz)
       }, settings.rainbowdelay);
           message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))

   }
   if(cmd === settings.prefix + settings.rainbowstop) {
           setTimeout(function () {
          process.exit()
           }, 1000);

                      message.channel.send(settings.messageresponse.rainbowstop).catch(err=> message.channel.send("No response"))
                      }


});

bot.login(tokenfile.token);
