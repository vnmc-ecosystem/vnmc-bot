import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { round_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const stats = {
	data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("View tournament statistics")
		.addStringOption(round_option),
	async execute(interaction: ChatInputCommandInteraction) {
		const embed = new EmbedBuilder({
			author: {
				name: "VNMC(year) - (full_round_name) - Stats",
				iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
			},
			title: "(stats_link)",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			color: strip_colors["info"],
			footer: {
				text: "Snapshot generated at"
			},
			timestamp: 1750845929000
		});

		await interaction.reply({ embeds: [embed] });
	}
};