const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('📜 Lists all available Phasmophobia bot commands.'),
    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setTitle('👻 Phasmophobia Bot Commands')
            .setDescription('Here’s a list of available commands to assist in your investigations:')
            .addFields(
                { name: '👻 `/ghost <ghost_name>`', value: 'Get details about a specific ghost.', inline: true },
                { name: '🔎 `/ghostevidence <ghost_name>`', value: 'Check the required evidence for a ghost.', inline: true },
                { name: '📋 `/possibleghosts <evidence>`', value: 'Find ghosts that match the given evidence.', inline: true },
                { name: '🔮 `/cursed <cursed_poss>`', value: 'Learn about a cursed possession.', inline: true },
                { name: '🗺️ `/maplocations <map_name>`', value: 'Find breaker and cursed object locations.', inline: true },
                { name: '⚡ `/hunt`', value: 'View hunt thresholds for all ghosts.', inline: true },
                { name: '🚀 `/speed`', value: 'Check ghost movement speeds.', inline: true },
                { name: '🏆 `/tierlist`', value: 'See the ghost danger ranking.', inline: true },
                { name: '👻 `/ghostnames`', value: 'See all available ghost names.', inline: true },
                { name: '🌍 `/mapnames`', value: 'See all valid map names.', inline: true }
            )
            .setColor(0x2b2d31)
            .setFooter({ text: 'Need help? Use /help anytime! 🔦' });

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }
};
