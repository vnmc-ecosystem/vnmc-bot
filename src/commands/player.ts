import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { name_option, sort_option, limit_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const player = {
	data: new SlashCommandBuilder()
		.setName("player")
		.setDescription("Player commands")
		.addSubcommand(sub => sub
			.setName("list")
			.setDescription("View registered players")
			.addStringOption(name_option)
			.addStringOption(sort_option)
			.addNumberOption(limit_option)
		)
		.addSubcommand(sub => sub
			.setName("register")
			.setDescription("Register for VNMC")
		)
		.addSubcommand(sub => sub
			.setName("leave")
			.setDescription("Leave VNMC (please dont :<)")
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "list") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - Player List",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "", value: "[oofyy](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#1111111)", inline: true},
					{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#1111)", inline: true},
					{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#11)", inline: true},
					{ name: "", value: "[TriDoanGaming](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#1111111)", inline: true},
					{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#11111)", inline: true},
					{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#111111)", inline: true}
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "register") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully registered for VNMC(year) as (player_name)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
		
		if (sub === "leave") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully left the tournament.",
				description: "We are so sad to see you leave :sob::sob::sob:",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
};