const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bestcursed')
        .setDescription('🤔 Suggests the best cursed possession for different situations'),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));

        const embed = new EmbedBuilder()
            .setTitle("🔮 Best Cursed Possessions")
            .setColor("#ffcc00")
            .setDescription("Different cursed possessions are best for different situations.")
            .addFields(
                { name: "🏠 Finding the Ghost Room", value: `Use the **Haunted Mirror**.`, inline: true },
                { name: "👻 Identifying the Ghost", value: `Use **Tarot Cards** or the **Ouija Board**.`, inline: true },
                { name: "🔥 Hunting for Fun", value: `Use the **Summoning Circle**.`, inline: true }
            )
            .setFooter({ text: "Phasmophobia Bot - Stay prepared, ghost hunters!" });

        await interaction.reply({ embeds: [embed] });
    }
};
