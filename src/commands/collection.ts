import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js"
import fetch from "node-fetch";
import config from "../config";

export const data = new SlashCommandBuilder()
    .setName("collection")
    .setDescription("reply collection")
    .addStringOption(option =>
        option.setName('collection')
            .setDescription('Name of collection'));

export async function execute(interaction: CommandInteraction) {
    const test = interaction.options.get("collection");
    console.log(test?.value)
    let req = fetch('https://scrapeninja.p.rapidapi.com/scrape', {
        method: 'POST',
        headers:
        {
            "Content-Type": "application/json",
            "x-rapidapi-host": "scrapeninja.p.rapidapi.com",
            "x-rapidapi-key": config.RAPIDAPI
        },
        body: JSON.stringify({
            "url": "https://core-api.prod.blur.io/v1/collections/" + test?.value,
            "headers": [
                "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
                "Accept: */*",
                "Accept-Language: en-US,en;q=0.5",
                "Accept-Encoding: gzip, deflate, br",
                "Referer: https://blur.io/",
                "Origin: https://blur.io",
                "Connection: keep-alive",
                "Sec-Fetch-Dest: empty",
                "Sec-Fetch-Mode: cors",
                "Sec-Fetch-Site: same-site",
                "Sec-GPC: 1",
                "TE: trailers",
                "Cookie: rl_session=RudderEncrypt%3AU2FsdGVkX1%2BjkWZBTMtQoKZpXCoYLU8N0SuFrDan0ostZC4lYM66KB3%2FoIXZ4VuIJEr6Mjcg0WJuVbWJykYjqLETJkJe%2BXbpKQOhPmoJamquRU0ypDTat3wYi9KK%2FoD8R6ZMm5O%2BjHM6lbiZ8WwoqA%3D%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2FSEZjoQfyryx9iv4H67TF9O3VwttYfPLqah6F0tDLXCO%2Bl2Vo5lwIpY4om5mebySnobgM3YC6egg%3D%3D; authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRBZGRyZXNzIjoiMHgwNjUxYTA1NzI1NDMxNmRiYjUzNTU3ODU5MjM1MThjOTcyNmY1NmI1Iiwic2lnbmF0dXJlIjoiMHg5MzdmZDBlNGZiYTUzN2I2Y2EyOGVmMTY3ZDNlMGE2ZDMyZTA3NTFhYzEyMzVhODIwOTA2ZjNkYjE2ZTdiZjljMTNmMmI0MzE5N2MwNWNkMjMwZDNjODE3OTNhYjAwNzI5NGZjNzc1ODY2ZTU3ZGRhYzJhMDhhMjQ4ODcxNWM3MDFjIiwiaWF0IjoxNjY4NzkyODY5LCJleHAiOjE2NzEzODQ4Njl9.qVU-bYM3HuDScjhBUvKqOWTwxwjX5KWJJR5AKEvORyU; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2BxMjWkWy4FsqCcE97jeVULeMaPz3PmXs6FGsf6XuB%2BQl8j%2FBkN3rbO58Mn5hcaNws3sNkelvAINg%3D%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2ByMkrV1BnO%2FpajqeGSINzkQwU4PEr%2FnKo%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2BiwB4Gtj44TMImMNUYANWIyufAs9pmgiE%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX19h0RjrwRuASkKpIWRnhN5m6LC6gOCJ5lw%3D; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX19Mr0HYlJQ92Ge59s0DAK2cYD5yTikftS4pq9QU51g5NsCTLY1KdgLC; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX1%2Bhfl3PUXHP9dVXnQFuVRtRxDK%2FnYImsXM%3D; __cf_bm=gsALlswj.cgdUnJlyQjSUTCIg3dojGyKocyUXqh7Srk-1668959473-0-AXm4xFqMrDcdXOK05TF1sNRHCzEaUg8Tba4AI9bb4+8FGTYfnXmaClCwqnydX9rGjIvbsfnY//MaJ+v4/XC0HDk="
            ]
        })
    });

    req.then((res) => res.json()).then((json) => {
        const colBody = JSON.parse(json.body);
        if (!colBody.statusCode) {
            const embed = new EmbedBuilder()
                .setTitle(colBody.collection.name)
                .setDescription(colBody.collection.collectionSlug)
                .setURL('https://blur.io/collection/' + colBody.collection.collectionSlug)
                .setAuthor({ name: colBody.collection.name, iconURL: colBody.collection.imageUrl, url: 'https://blur.io/collection/' + colBody.collection.collectionSlug })

            console.log(colBody)

            return interaction.reply({ embeds: [embed] })
        }else{
            const embed = new EmbedBuilder()
            .setTitle(colBody.message)
            
            return interaction.reply({ embeds: [embed] })
        }
    })
}