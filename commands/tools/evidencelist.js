const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evidencelist')
        .setDescription('🧾 Lists all evidence types and their corresponding ghosts'),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));
        const embed = new EmbedBuilder()
            .setTitle("🔍 Ghost Evidence List")
            .setColor("#0099ff")
            .setDescription("Below is a list of all evidence types and which ghosts can have them.")
            .setFooter({ text: "Phasmophobia Bot - Stay prepared, ghost hunters!" });

        for (const evidence in phasmoData.evidence_list) {
            embed.addFields({ 
                name: `📝 ${evidence}`, 
                value: phasmoData.evidence_list[evidence].join(', '), 
                inline: true 
            });
        }

        await interaction.reply({ embeds: [embed] });
    }
};
