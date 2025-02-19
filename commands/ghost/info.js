const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ghost')
        .setDescription('🕵️‍♀️ Retrieve information about a ghost')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Select a ghost')
                .setRequired(true)
                .addChoices(
                    { name: 'Spirit', value: 'Spirit' },
                    { name: 'Wraith', value: 'Wraith' },
                    { name: 'Phantom', value: 'Phantom' },
                    { name: 'Poltergeist', value: 'Poltergeist' },
                    { name: 'Banshee', value: 'Banshee' },
                    { name: 'Jinn', value: 'Jinn' },
                    { name: 'Mare', value: 'Mare' },
                    { name: 'Revenant', value: 'Revenant' },
                    { name: 'Shade', value: 'Shade' },
                    { name: 'Demon', value: 'Demon' },
                    { name: 'Yurei', value: 'Yurei' },
                    { name: 'Hantu', value: 'Hantu' },
                    { name: 'Oni', value: 'Oni' },
                    { name: 'Raiju', value: 'Raiju' },
                    { name: 'The Twins', value: 'The Twins' },
                    { name: 'The Mimic', value: 'The Mimic' },
                    { name: 'Onryo', value: 'Onryo' },
                    { name: 'Moroi', value: 'Moroi' },
                    { name: 'Deogen', value: 'Deogen' },
                    { name: 'Thaye', value: 'Thaye' },
                    { name: 'Obake', value: 'Obake' },
                    { name: 'Goryo', value: 'Goryo' },
                    { name: 'Myling', value: 'Myling' },
                    { name: 'Yokai', value: 'Yokai' }
                )
        ),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));
        const ghostName = interaction.options.getString('name');

        const ghost = phasmoData.ghosts.find(g => g.name === ghostName);

        if (!ghost) {
            return interaction.reply({ content: '❌ Ghost not found. Please check the name and try again.', ephemeral: true });
        }

        const embed = new EmbedBuilder()
            .setColor('#ff9900')
            .setTitle(`👻 ${ghost.name}`)
            .setDescription(ghost.behavior || "No additional behavior details.")
            .addFields(
                { name: '📝 Evidence', value: ghost.evidence.join(', '), inline: true },
                { name: '💪 Strength', value: ghost.strength, inline: true },
                { name: '⚠️ Weakness', value: ghost.weakness, inline: true },
                { name: '🏃 Speed', value: ghost.speed || "Unknown", inline: true },
                { name: '🔪 Hunt Threshold', value: ghost.hunt_threshold || "Standard 50% sanity", inline: true }
            )
            .setFooter({ text: 'Phasmophobia Bot - Stay prepared, ghost hunters!' });

        await interaction.reply({ embeds: [embed] });
    }
};
