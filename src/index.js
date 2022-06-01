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
  "urmom",
  "deeznuts",
  "deez nuts essentially",
  "urmom essentially",
  "bryan is opai",
  "how was ur poop?",
  "i hate it here on god",
  "ogm deric is so cool",
];

const triggers = [
  {
    message: "dani",
    reply: () => {
      return pharses[Math.floor(Math.random() * pharses.length)]
    }
  },
  {
    message: "deric sucks",
    reply: "no ur mom sucks"
  },
  {
    message: "deez nuts",
    reply: "gotem"
  },
  {
    message: ["👉 👈", "👉👈"],
    reply: {
      "files": ["https://i.imgur.com/5k2Rb0y.png"]
    }
  }
];

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  function execute(currentPhrase) {
    const channelId = message.channelId;
    const channel = client.channels.cache.get(channelId);
    if (currentPhrase.reply instanceof Function) {
      channel.send(currentPhrase.reply());
    } else {
      channel.send(currentPhrase.reply);
    }
  }

  // Iterates through all the triggers` objects.
  for (const trigger of triggers) {
    // Check if there's many to one relationship to a certain trigger's message.
    if (Array.isArray(trigger.message)) {
      const hasMatch = trigger.message.some(phrase => message.content.includes(phrase));
      hasMatch && execute(trigger);
    } else {
      if (message.content.includes(trigger.message)) {
        execute(trigger);
      }
    }
  }

});

client.on("ready", () => {
  console.log(`Loggined in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);