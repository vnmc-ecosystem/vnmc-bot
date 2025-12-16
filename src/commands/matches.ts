import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { round_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const matches = {
	data: new SlashCommandBuilder()
		.setName("matches")
		.setDescription("Matches commands")
		.addSubcommand(sub => sub
			.setName("get")
			.setDescription("View a round's match list")
			.addStringOption(round_option)
		)
		.addSubcommand(sub => sub
			.setName("fetch")
			.setDescription("Update match list")
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "get") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - (full_round_name) - Match List",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "", value: "**Match (match_id)**: :red_square: [(player_1_name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#seed) (time - remaining_time) [(player_2_name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#seed) :blue_square:" },
					{ name: "", value: "**Match (match_id)**: :red_square: [(player_1_name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#seed) **6** - 0 [(player_2_name)](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#seed) :blue_square:" },
					{ name: "", value: "**Match 1**: :red_square: [AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#1) **6** - 0 [AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#0) :blue_square:" },
					{ name: "", value: "**Match 1**: :red_square: [xitinapple](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#1) <t:1750845929:d> <t:1750845929:t> [TriDoanGaming](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (#0) :blue_square:" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "fetch") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully fetched matches for VNMC(year)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
};