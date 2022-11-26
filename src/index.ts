require('dotenv').config();
import { Client } from "discord.js";
import * as fs from 'fs';

const token = process.env.DISCORDBOTTOKEN;

console.log("Bot is starting...");


const client = new Client({
    intents: []
});


client.login(token);
console.log(client); 