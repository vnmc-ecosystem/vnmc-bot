import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { event_option, day_option, month_option, year_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const schedule = {
	data: new SlashCommandBuilder()
		.setName("schedule")
		.setDescription("Schedule commands")
		.addSubcommand(sub => sub
			.setName("list")
			.setDescription("View tournament schedules")
		)
		.addSubcommand(sub => sub
			.setName("create")
			.setDescription("Add an event to a tournament")
			.addStringOption(event_option)
			.addNumberOption(day_option("start"))
			.addNumberOption(month_option("start"))
			.addNumberOption(year_option("start"))
			.addNumberOption(day_option("end"))
			.addNumberOption(month_option("end"))
			.addNumberOption(year_option("end"))
		)
		.addSubcommand(sub => sub
			.setName("update")
			.setDescription("Update an event's schedule")
			.addStringOption(event_option)
			.addNumberOption(day_option("start"))
			.addNumberOption(month_option("start"))
			.addNumberOption(year_option("start"))
			.addNumberOption(day_option("end"))
			.addNumberOption(month_option("end"))
			.addNumberOption(year_option("end"))
		)
		.addSubcommand(sub => sub
			.setName("delete")
			.setDescription("Remove an event from a tournament")
			.addStringOption(event_option)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "list") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - Tournament Schedule",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "", value: "**(event_name)**: <t:1750845929:d> - <t:1750845929:d>" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "create") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully added new schedule for VNMC(year)!",
				color: strip_colors["success"],
				fields: [
					{ name: "", value: "**Event Name**: (event_name)"},
					{ name: "", value: "**Start Time**: <t:1757949636:d>"},
					{ name: "", value: "**End Time**: <t:1757949636:d>"}
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "update") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully updated schedule for VNMC(year)!",
				color: strip_colors["success"],
				fields: [
					{ name: "", value: "**Updated Event Name**: (event_name)"},
					{ name: "", value: "**New Start Time**: <t:1757949636:d>"},
					{ name: "", value: "**New End Time**: <t:1757949636:d>"}
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "delete") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully deleted schedule (event_name) for VNMC(year)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	},
};