import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { round_option, map_code_option, map_id_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

export const map = {
	data: new SlashCommandBuilder()
		.setName("map")
		.setDescription("Map commands")
		.addSubcommand(sub => sub
			.setName("get")
			.setDescription("View a map's info")
			.addStringOption(round_option)
			.addStringOption(map_code_option)
		)
		.addSubcommand(sub => sub
			.setName("add")
			.setDescription("Add a map to a mappool")
			.addStringOption(round_option)
			.addStringOption(map_code_option)
			.addNumberOption(map_id_option("add"))
		)
		.addSubcommand(sub => sub
			.setName("edit")
			.setDescription("Edit a map's ID")
			.addStringOption(round_option)
			.addStringOption(map_code_option)
			.addNumberOption(map_id_option("edit"))
		)
		.addSubcommand(sub => sub
			.setName("delete")
			.setDescription("Remove a map from a pool")
			.addStringOption(round_option)
			.addStringOption(map_code_option)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "get") {
			const round_option_value = interaction.options.getString("round");
			const map_code_option_value = interaction.options.getString("map_code");

			console.log(round_option_value?.toLowerCase())
			console.log(map_code_option_value?.toUpperCase())

			const res = await fetch(`http://localhost:8000/map/${round_option_value?.toLowerCase()}/${map_code_option_value?.toUpperCase()}`);
			const map = await res.json();
			console.log(map);
			const {
				abbr,
				year,
				round,
				code,
				pattern,
				map: {
					title,
					diff_name,
					url,
					banner_url,
					artist,
					sr,
					bpm,
					od,
					hp,
					drain_time
				}
			} = map;

			const embed = new EmbedBuilder({
				author: {
					name: `${abbr}${year} - ${round} - ${code}`,
					icon_url: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				title: `${title} [${diff_name}]`,
				url: url,
				thumbnail: {
					url: banner_url
				},
				description: `${artist}`,
				color: strip_colors["info"],
				fields: [
					{ name: "\u200B", value: "" },

					{ name: "", value: `**SR**: ${sr}` },
					{ name: "", value: `**BPM**: ${bpm}` },
					{ name: "", value: `**OD**: ${od}` },
					{ name: "", value: `**HP**: ${hp}` },
					{ name: "", value: `**Length**: ${drain_time}` }
				],
				footer: {
					text: `Map Pattern: ${pattern}`
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