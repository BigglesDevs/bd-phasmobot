const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hunt')
        .setDescription('👁️ Shows the hunt sanity thresholds for all ghosts.'),
    async execute(interaction) {
        const data = JSON.parse(fs.readFileSync('./data/phasmo_data.json', 'utf8'));
        const huntThresholds = data.hunt_thresholds;
        const huntEntries = Object.entries(huntThresholds)
            .map(([ghost, threshold]) => `👻 **${ghost}** → ${threshold}`)
            .join('\n');

        const huntEmbed = new EmbedBuilder()
            .setTitle('👁️ Hunt Sanity Thresholds')
            .setDescription(huntEntries)
            .setColor(0xff4500)
            .setThumbnail()
            .setFooter({ text: 'Watch out! Some ghosts hunt much earlier than others. 👀' });

        await interaction.reply({ embeds: [huntEmbed], ephemeral: false });
    }
};
