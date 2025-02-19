const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cursed')
        .setDescription('😈 Get details on a cursed possession')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Select a cursed possession')
                .setRequired(true)
                .addChoices(
                    { name: 'Ouija Board', value: 'Ouija Board' },
                    { name: 'Music Box', value: 'Music Box' },
                    { name: 'Tarot Cards', value: 'Tarot Cards' },
                    { name: 'Haunted Mirror', value: 'Haunted Mirror' },
                    { name: 'Summoning Circle', value: 'Summoning Circle' },
                    { name: 'Voodoo Doll', value: 'Voodoo Doll' }
                )
        ),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));
        const name = interaction.options.getString('name');

        if (!phasmoData.cursed_possessions[name]) {
            return interaction.reply({ content: '❌ Cursed possession not found.', ephemeral: true });
        }

        const item = phasmoData.cursed_possessions[name];

        const embed = new EmbedBuilder()
            .setTitle(`🔮 ${name}`)
            .setDescription(item.description)
            .setColor('#ff9900')
            .setThumbnail(item.image)
            .addFields(
                { name: "📖 Usage", value: item.usage || "No specific usage details.", inline: false },
                { name: "⚠️ Risk", value: item.risk || "No risk information available.", inline: false }
            )
            .setFooter({ text: "Phasmophobia Bot - Stay prepared, ghost hunters!" });

        await interaction.reply({ embeds: [embed] });
    }
};
