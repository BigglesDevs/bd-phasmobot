const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('smudge')
        .setDescription('⌛ Starts a 3-minute smudge stick timer'),

    async execute(interaction) {
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle("🔥 Smudge Stick Used!")
            .setDescription("The ghost won't hunt for **90 seconds** (or **180 seconds** for a Spirit). Stay alert! 👀")
            .setColor("#FFA500")
            .setThumbnail("https://static.wikia.nocookie.net/phasmophobia/images/f/f7/Incense090_T2.png/revision/latest?cb=20230822153324")
            .setFooter({ text: "Phasmophobia Bot - Stay alive, hunter!" });

        await interaction.reply({ content: `${user}`, embeds: [embed] });

        // 90-second warning
        setTimeout(async () => {
            const embed90 = new EmbedBuilder()
                .setTitle("⏳ 90 Seconds Passed!")
                .setDescription("The ghost is warming up... it **might** start hunting again. Be careful! 😨")
                .setColor("#FF4500")
                .setThumbnail("https://static.wikia.nocookie.net/phasmophobia/images/f/f7/Incense090_T2.png/revision/latest?cb=20230822153324")
                .setFooter({ text: "Phasmophobia Bot - Stay alive, hunter!" });
                

            await interaction.followUp({ content: `${user} ⚠️`, embeds: [embed90] });
        }, 90000);

        setTimeout(async () => {
            const embed180 = new EmbedBuilder()
                .setTitle("⚠️ 180 Seconds Passed!")
                .setDescription("The **Spirit** can now hunt again.**Phew!** That was a close one... but it's not over yet. 👀💀")
                .setColor("#8B0000")
                .setThumbnail("https://static.wikia.nocookie.net/phasmophobia/images/f/f7/Incense090_T2.png/revision/latest?cb=20230822153324")
                .setFooter({ text: "Phasmophobia Bot - Stay alive, hunter!" });

            await interaction.followUp({ content: `${user} 💀`, embeds: [embed180] });
        }, 180000);
    }
};
