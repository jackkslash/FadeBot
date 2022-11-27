import dotenv from "dotenv"
dotenv.config()
const {RAPIDAPI, CLIENTID, GUILDID, DISCORDBOTTOKEN} = process.env;

if(!CLIENTID || !GUILDID || !DISCORDBOTTOKEN || !RAPIDAPI){
    throw new Error("Missing .env vars")
}

const config: Record<string, string> = {
    RAPIDAPI,
    CLIENTID,
    GUILDID,
    DISCORDBOTTOKEN,
}

export default config;