import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { strip_colors } from "$lib/constants";

export const mappool = {
	data: new SlashCommandBuilder()
		.setName("mappool")
		.setDescription("Mappool commands")
		.addSubcommand(sub => sub
			.setName("get")
			.setDescription("View a round's mappool")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("create")
			.setDescription("Initialize a round's mappool")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("delete")
			.setDescription("Delete a round's mappool")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "get") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - (full_round_name) Mappool",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: ":rice: **RC maps:**", value: "\u200B" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**RC1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },

					{ name: "\u200B", value: "" },

					{ name: ":ramen: **LN maps:**", value: "\u200B" },
					{ name: "", value: "**LN1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" },
					{ name: "", value: "**LN1** - [title [diff_name]](https://www.youtube.com/watch?v=dQw4w9WgXcQ)" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "create") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully created (full_round_name) mappool!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
		
		if (sub === "delete") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully deleted (full_round_name) mappool!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
};