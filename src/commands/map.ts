import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { strip_colors } from "$lib/constants";

export const map = {
	data: new SlashCommandBuilder()
		.setName("map")
		.setDescription("Map commands")
		.addSubcommand(sub => sub
			.setName("get")
			.setDescription("View a map's info")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
			.addStringOption(option =>
				option
				.setName("map_code")
				.setDescription("Map code")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("add")
			.setDescription("Add a map to a mappool")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
			.addStringOption(option =>
				option
				.setName("map_code")
				.setDescription("Map code")
				.setRequired(true)
			)
			.addNumberOption(option =>
				option
				.setName("map_id")
				.setDescription("Beatmap ID")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("edit")
			.setDescription("Edit a map's ID")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
			.addStringOption(option =>
				option
				.setName("map_code")
				.setDescription("Map code")
				.setRequired(true)
			)
			.addNumberOption(option =>
				option
				.setName("new_map_id")
				.setDescription("Beatmap ID")
				.setRequired(true)
			)
		)
		.addSubcommand(sub => sub
			.setName("delete")
			.setDescription("Remove a map from a pool")
			.addStringOption(option =>
				option
				.setName("round")
				.setDescription("Round name")
				.setRequired(true)
			)
			.addStringOption(option =>
				option
				.setName("map_code")
				.setDescription("Map code")
				.setRequired(true)
			)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "get") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - (full_round_name) - (code)",
					icon_url: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				title: "(title) [(diff_name)]",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				thumbnail: {
					url: "https://images-ext-1.discordapp.net/external/cvpjQjX7xZIFJ6CZ6vf5MRMfHqBhbZbcxkZ6ZNsxH_w/%3Fwidth%3D640%26crop%3Dsmart%26auto%3Dwebp%26s%3D464d44927eaa8a49ab2b845b0e61e22ed7ca02d6/https/preview.redd.it/eminem-pointing-to-the-camera-with-question-mark-restored-v0-vllsckakeaya1.jpg?format=webp&width=800&height=596"
				},
				description: "(artist)",
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "", value: "**SR**: (sr)" },
					{ name: "", value: "**BPM**: (bpm)" },
					{ name: "", value: "**OD**: (od)" },
					{ name: "", value: "**HP**: (hp)" },
					{ name: "", value: "**Length**: (mm:ss)" }
				],
				footer: {
					text: "Map Pattern: (pattern)"
				}
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "add") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully added new map to pool (full_round_name)!",
				color: strip_colors["success"],
				fields: [
					{ name: "", value: "**Map Code**: (code)" },
					{ name: "", value: "**Map ID**: (id)" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "edit") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully updated map (code) in pool (full_round_name)!",
				color: strip_colors["success"],
				fields: [
					{ name: "", value: "**New Map ID**: (id)" }
				]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "delete") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully deleted map (code) in pool (full_round_name)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
};