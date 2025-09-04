import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { strip_colors } from "$lib/constants";

export const staff = {
	data: new SlashCommandBuilder()
		.setName("staff")
		.setDescription("Staff commands")
		.addSubcommand(sub => sub
			.setName("list")
			.setDescription("View staff list")
			.addStringOption(option =>
				option
				.setName("role")
				.setDescription("Staff role")
			)
		)
		.addSubcommand(sub => sub
			.setName("register")
			.setDescription("Apply for a staff role")
			.addStringOption(option =>
				option
				.setName("role")
				.setDescription("Staff role")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("change")
			.setDescription("Request to change your staff role")
			.addStringOption(option =>
				option
				.setName("old_role")
				.setDescription("Role to be changed")
				.setRequired(true)
			)
			.addStringOption(option =>
				option
				.setName("new_role")
				.setDescription("Role to change to")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("leave")
			.setDescription("Leave a staff role")
			.addStringOption(option =>
				option
				.setName("role")
				.setDescription("Staff role")
				.setRequired(true)
			)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "list") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - Staff List",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "(role)", value: "" },
					{ name: "", value: "[AHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_vn: ", inline: true },
					{ name: "", value: "[AHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_gb:", inline: true },
					{ name: "", value: "[AHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_us:", inline: true },
					{ name: "", value: "[TriDoanGaming](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_fr:", inline: true },
					{ name: "", value: "[(name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_it:", inline: true },
					{ name: "", value: "[(name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :flag_de:", inline: true },

					{ name: "\u200B", value: "" },

					{ name: "(role)", value: "" },
					{ name: "", value: "- [(name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "- [(name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "- [(name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "register") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully registered new (full_staff_role) to (player_name)!",
				color: strip_colors["success"]
			});
				

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "update") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully switched (player_name)'s role to (new_full_staff_role) from (old_full_staff_role)!",
				color: strip_colors["success"]
			});
				

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "leave") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully deleted (full_staff_role) role for (player_name)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
};