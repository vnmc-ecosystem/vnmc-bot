import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { abbr_option, top_cut_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const create_tourney = {
	data: new SlashCommandBuilder()
		.setName("create-tourney")
		.setDescription("Create a VNMC iteration")
		.addStringOption(abbr_option)
		.addNumberOption(top_cut_option),
	async execute(interaction: ChatInputCommandInteraction) {
		const embed = new EmbedBuilder({
			title: ":white_check_mark:    Successfully created tournament VNMC(year)!",
			color: strip_colors["success"]
		});

		await interaction.reply({ embeds: [embed] });
	}
};