require('dotenv').config();

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require("@discordjs/rest");

const DEBUG = process.env.DEBUG;
const DISCORD_TOKEN = DEBUG ? process.env.TEST_DISCORD_TOKEN : process.env.DISCORD_TOKEN;
const CLIENT_ID = DEBUG ? process.env.TEST_CLIENT_ID : process.env.CLIENT_ID;
const GUILD_ID = DEBUG ? process.env.TEST_GUILD_ID : process.env.GUILD_ID;

const createQR = new SlashCommandBuilder();
createQR.setName("createqr");
createQR.setDescription("Create QR code given by an URL.");
createQR.addStringOption(option => 
  option
    .setName("url")
    .setDescription("the url you want to be converted into a QR image.")
    .setRequired(true)
);
createQR.addIntegerOption(option => 
  option
    .setName("size")
    .setDescription("the width and height of the QR code in pixels.")
);

const commands = [
  createQR
].map(command => command.toJSON());

const rest = new REST({
  version: "10"
}).setToken(DISCORD_TOKEN);

console.log(CLIENT_ID);
console.log(GUILD_ID);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => "Successfully registered application commands.")
  .catch(console.error);