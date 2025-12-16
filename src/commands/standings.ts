import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { strip_colors } from "$lib/constants";

export const standings = {
	data: new SlashCommandBuilder()
		.setName("standings")
		.setDescription("View a tournament's ranking"),
	async execute(interaction: ChatInputCommandInteraction) {
		const embed = new EmbedBuilder({
			author: {
				name: "VNMC(year) - Final Standings",
				iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
			},
			color: strip_colors["info"],
			fields: [
				{ name: "\u200B", value: "" },

				{ name: "", value: ":first_place: [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
				{ name: "", value: ":second_place: [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
				{ name: "", value: ":third_place: [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
				{ name: "", value: "*Top 4*: [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
				{ name: "", value: "*Top 5-6*: [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ), [player_name](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" }
			]
		});

		await interaction.reply({ embeds: [embed] });
	}
};