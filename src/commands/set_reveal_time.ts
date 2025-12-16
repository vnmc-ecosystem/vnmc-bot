import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { hour_option, minute_option, day_option, month_option, year_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const set_reveal_time = {
	data: new SlashCommandBuilder()
		.setName("set-reveal-time")
		.setDescription("Set the time to reveal qualifier results (UTC+7)")
		.addNumberOption(hour_option)
		.addNumberOption(minute_option)
		.addNumberOption(day_option())
		.addNumberOption(month_option())
		.addNumberOption(year_option()),
	async execute(interaction: ChatInputCommandInteraction) {
		const embed = new EmbedBuilder({
			title: ":white_check_mark:    Successfully updated stats reveal time to <t:1757844858:F>!",
			color: strip_colors["success"]
		});

		await interaction.reply({ embeds: [embed] });
	}
};