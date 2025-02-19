const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot'),

    async execute(interaction) {
        const botUser = interaction.client.user;
        const uptime = process.uptime();
        const uptimeFormatted = formatUptime(uptime);
        const authorid = '676354368404193280';
        const ownerAvatar = `https://cdn.discordapp.com/avatars/${authorid}/${interaction.client.users.cache.get(authorid)?.avatar}.png`;

        const embed = new EmbedBuilder()
            .setTitle("😎 BD-Phasmo Bot Information")
            .setDescription(
                "BD-Phasmo Bot is a **Phasmophobia Discord assistant** that helps ghost hunters track **evidence**, **cursed objects**, and set up **timers**. " +
                "It provides **real-time ghost info**, **custom tools**, and **auto-updating data** to keep investigations smooth. " +
                "Stay prepared, whether hunting solo or with friends—this bot keeps you **one step ahead of the ghost**. 👀")
            .setColor("#5865F2")
            .setThumbnail(ownerAvatar)
            .addFields(
                { name: "🕒 Uptime", value: uptimeFormatted, inline: true },
                { name: "🌐 Servers", value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: "👤 Developer", value: "Biggles Development", inline: true },
                { name: "🔗 GitHub", value: "[Have a look!](https://github.com/BigglesDevs)", inline: true },
                { name: "🛒 Custom Bot?", value: "[Order Here!](https://discord.gg/3WBHjaVNXG)", inline: true },
                { name: "💖 Support Server", value: "[Discord Supoort!](https://discord.gg/3WBHjaVNXG)", inline: true }
            )
            .setFooter({ text: "Developed by BigglesDevelopment 💖 | Phasmophobics custom bot!" });

        await interaction.reply({ embeds: [embed] });
    }
};

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}
