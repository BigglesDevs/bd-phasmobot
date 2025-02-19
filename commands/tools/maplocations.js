const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maplocations')
        .setDescription('🗺️ Shows spawn locations of cursed objects and breakers')
        .addStringOption(option =>
            option.setName('map')
                .setDescription('Select a map')
                .setRequired(true)
                .addChoices(
                    { name: 'Tanglewood', value: 'Tanglewood' },
                    { name: 'Ridgeview', value: 'Ridgeview' },
                    { name: 'Edgefield', value: 'Edgefield' },
                    { name: 'Willow Street House', value: 'Willow Street House' },
                    { name: 'Bleasdale Farmhouse', value: 'Bleasdale Farmhouse' },
                    { name: 'Grafton Farmhouse', value: 'Grafton Farmhouse' },
                    { name: 'Brownstone High School', value: 'Brownstone High School' },
                    { name: 'Sunny Meadows Asylum', value: 'Sunny Meadows Asylum' },
                    { name: 'Sunny Meadows Restricted', value: 'Sunny Meadows Restricted' },
                    { name: 'Maple Lodge Campsite', value: 'Maple Lodge Campsite' },
                    { name: 'Prison', value: 'Prison' },
                    { name: 'Camp Woodwind', value: 'Camp Woodwind' },
                    { name: 'Point Hope', value: 'Point Hope' }
                )
        ),

    async execute(interaction) {
        const phasmoData = JSON.parse(fs.readFileSync('./data/phasmo_data.json'));
        const map = interaction.options.getString('map');

        if (!phasmoData.maps[map]) {
            return interaction.reply({ content: '❌ Map not found. Please check the name and try again.', ephemeral: true });
        }

        const mapData = phasmoData.maps[map];
        const breakerList = mapData.breaker.map(location => `🔹 ${location}`).join('\n');
        const cursedObjectsList = mapData.cursed_objects.map(location => `🔹 ${location}`).join('\n');

        const embed = new EmbedBuilder()
            .setTitle(`📍 ${map} - Map Details`)
            .setColor("#0099ff")
            .setDescription(`Here are the key locations for **${map}**.`)
            .addFields(
                { name: '⚡ Breaker Locations', value: breakerList, inline: true },
                { name: '🔮 Cursed Object Locations', value: cursedObjectsList, inline: true }
            )
            .setImage(mapData.image)
            .setFooter({ text: "Phasmophobia Bot - Stay prepared, ghost hunters!" });

        await interaction.reply({ embeds: [embed] });
    }
};
