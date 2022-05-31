require('dotenv').config();

const { 
  Client, 
  Intents 
} = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES
  ],
  partials: ['MESSAGE', 'CHANNEL']
});

const pharses = [
  "deez nuts essentially",
  "urmom essentially",
  "deric is cool essentially",
  "bryan is opai essentially",
  "how was ur poop?",
];

const triggers = [
  {
    message: "dani",
    reply: pharses[Math.floor(Math.random() * pharses.length)]
  },
  {
    message: "deric sucks",
    reply: "no ur mom sucks"
  },
  {
    message: "deez nuts",
    reply: "gotem"
  }
];

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  for (const trigger of triggers) {
    if (message.content.includes(trigger.message)) {
      const channelId = message.channelId;
      const channel = client.channels.cache.get(channelId);
      channel.send(trigger.reply);
    }
  }

});

client.on("ready", () => {
  console.log(`Loggined in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);