require('dotenv').config();

const { 
  Client, 
  Partials,
  GatewayIntentBits,
} = require("discord.js");

const DEBUG = process.env.DEBUG;
const DISCORD_TOKEN = DEBUG ? process.env.TEST_DISCORD_TOKEN : process.env.DISCORD_TOKEN;

const client = new Client(
  { 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    prtials: [Partials.Channel]
  }
);

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
      "files": ["https://i.imgur.com/KrngtmR.png"]
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

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  try {
    switch(commandName) {
      case "createqr":
        const url = interaction.options.getString("url");
        const size = interaction.options.getInteger("size") || 500;

        if (!url.includes("http")) {
          await interaction.reply("You either didn't input a valid URL or you forgot to include 'https://' or 'http://' in front of your URL.");
          break;
        }

        interaction.channel.send(`Here's your QR code for ${url}`);
        await interaction.reply(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`);

        break;
      default:
        await interaction.reply("Invalid command.");
    }
  } catch(error) {
    interaction.reply("error:", error.message);
  }
});

client.on("ready", () => {
  console.log("DEBUG:", DEBUG);
  console.log(`Loggined in as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);