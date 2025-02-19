const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('speed')
        .setDescription('⚡ Shows the speed of different ghosts.'),
    async execute(interaction) {
        const data = JSON.parse(fs.readFileSync('./data/phasmo_data.json', 'utf8'));
        const speeds = data.speeds;
        const speedEntries = Object.entries(speeds)
            .map(([ghost, speed]) => `👻 **${ghost}** → ${speed}`)
            .join('\n');

        const speedEmbed = new EmbedBuilder()
            .setTitle('⚡ Ghost Speeds')
            .setDescription(speedEntries)
            .setColor(0xFFA500)
            .setFooter({ text: 'Some ghosts are way faster than you expect. Run! 🏃‍♂️' });

        await interaction.reply({ embeds: [speedEmbed], ephemeral: false });
    }
};
