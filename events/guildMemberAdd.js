const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        try {
            const welcomeChannelID = process.env.WELCOME_CHANNEL_ID || null;
            if (!welcomeChannelID) {
                console.error('No welcomeChannelID provided in configuration or .env.');
                return;
            }

            // Fetch the welcome channel
            const channel = member.guild.channels.cache.get(welcomeChannelID);
            if (!channel) {
                console.error(`Welcome channel not found with ID: ${welcomeChannelID}`);
                return;
            }

            const color = 0x0099ff;

            const serverName = member.guild.name;
            const userAvatar = member.user.displayAvatarURL();

            const embed = new EmbedBuilder()
                .setTitle(`Welcome to ${serverName}, ${member.user.username}! 🎉`)
                .setDescription(
                    `Hey ${member.user.username}! We're excited to have you join us here at **${serverName}**! 🚀\n\n` +
                    `Take a moment to introduce yourself and explore the channels. We have a lot of fun activities and discussions waiting for you. 🧩\n\n` +
                    `Before you dive in, make sure to read the rules to get started. 🔐\n\n` +
                    `If you need any help, feel free to reach out to any of our mods or admins! We're here to help. 🛠️`
                )
                .setColor(color)
                .setThumbnail(userAvatar)
                .setFooter({ text: `Enjoy your time at ${serverName}!` })
                .setTimestamp();

            // Send the embed to the welcome channel
            await channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error in guildMemberAdd event:', error);
        }
    },
};
