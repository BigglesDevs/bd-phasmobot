const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tierlist')
        .setDescription('📋 Displays a tier list ranking of ghosts by danger level'),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));

        if (!phasmoData.tier_list) {
            return interaction.reply({ content: '❌ Tier list data not found in JSON.', ephemeral: false });
        }

        const embed = new EmbedBuilder()
            .setTitle("👻 Phasmophobia Ghost Tier List")
            .setColor("#ff0000")
            .setDescription("This tier list ranks ghosts based on their danger level.")
            .setFooter({ text: "Phasmophobia Bot - Stay prepared, ghost hunters!" });

        for (const tier in phasmoData.tier_list) {
            embed.addFields({
                name: `🔥 ${tier} Tier`,
                value: phasmoData.tier_list[tier].join(', '),
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed] });
    }
};
