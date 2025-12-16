import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { strip_colors } from "$lib/constants";

export const login = {
	data: new SlashCommandBuilder()
		.setName("login")
		.setDescription("Authenticate osu! account"),
	async execute(interaction: ChatInputCommandInteraction) {
		const wait_embed = new EmbedBuilder({
			title: "Authenticate",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			description: "Please follow the link above and click on the **Authorize** button.",
			footer: {
				text: "⌛ Waiting for authentication..."
			},
			color: strip_colors["pending"]
		});

		const success_embed = new EmbedBuilder({
			title: ":white_check_mark:    Successfully authenticated as (player_name)!",
			color: strip_colors["success"]
		});

		const failed_embed = new EmbedBuilder({
			title: ":x:    Authentication failed. Please try again.",
			color: strip_colors["error"]
		});

		await interaction.reply({ embeds: [wait_embed, success_embed, failed_embed] });
	}
};