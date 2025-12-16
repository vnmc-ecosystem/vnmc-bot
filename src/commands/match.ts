import { addDays, format, startOfWeek } from "date-fns";
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { match_id_option, ref_id_option, hour_option, minute_option, day_of_week_option } from "$lib/options";
import { strip_colors } from "$lib/constants";

const reschedule_times = new Map();

export const match = {
	data: new SlashCommandBuilder()
		.setName("match")
		.setDescription("Match commands")
		.addSubcommand(sub => sub
			.setName("get")
			.setDescription("View a match's info")
			.addNumberOption(match_id_option)
		)
		.addSubcommand(sub => sub
			.setName("assign-ref")
			.setDescription("Assign a referee to a match")
			.addNumberOption(match_id_option)
			.addNumberOption(ref_id_option)
		)
		.addSubcommand(sub => sub
			.setName("remove-ref")
			.setDescription("Remove all referees from a match")
			.addNumberOption(match_id_option)
		)
		.addSubcommand(sub => sub
			.setName("reschedule")
			.setDescription("Request match time change (UTC+7)")
			.addNumberOption(match_id_option)
			.addNumberOption(day_of_week_option)
			.addNumberOption(hour_option)
			.addNumberOption(minute_option)
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const sub = interaction.options.getSubcommand();

		if (sub === "get") {
			const embed = new EmbedBuilder({
				author: {
					name: "VNMC(year) - (full_round_name) - Match (match_id)",
					iconURL: "https://vnmc.vercel.app/assets/2022/VNMC2022_LOGO.webp"
				},
				title: "(player_1_name) VS (player_2_name)",
				url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				description: "<t:1750845929:d> <t:1750845929:t> <t:1750609200:R>",
				color: strip_colors["info"],
				fields: 
					[
						{ name: "\u200B", value: "" },

						{ name: ":bar_chart: Results", value: "" },
						{ name: "", value: ":red_square: [AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
						{ name: "", value: "**6** - 0", inline: true },
						{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :blue_square:", inline: true },

						{ name: "\u200B", value: "" },

						{ name: ":game_die: Rolls", value: "" },
						{ name: "", value: ":red_square: [AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ)", inline: true },
						{ name: "", value: "69 - **96**", inline: true },
						{ name: "", value: "[AHHHHHHHHHHHHHH](https://www.youtube.com/watch?v=dQw4w9WgXcQ) :blue_square:", inline: true },
						{ name: "", value: ":blue_square: chose to protect second." },

						{ name: "\u200B", value: "" },

						{ name: ":shield: :no_entry_sign: Protect and Ban Phase", value: "" },
						{ name: "", value: ":red_square: protects (code)" },
						{ name: "", value: ":blue_square: protects (code)" },
						{ name: "", value: ":blue_square: bans (code)" },
						{ name: "", value: ":red_square: bans (code)" },
						
						{ name: "\u200B", value: "" },
						
						{ name: ":crossed_swords: Picks", value: "" },
						{ name: "", value: ":red_square: picked (code) >> :red_square: won" },
						{ name: "", value: ":blue_square: picked (code) >> :red_square: won" },
						{ name: "", value: ":red_square: picked (code) >> :red_square: won" },
						{ name: "", value: ":blue_square: picked (code) >> :red_square: won" },
						{ name: "", value: ":red_square: picked (code) >> :red_square: won" },
						{ name: "", value: ":blue_square: picked (code) >> :red_square: won" },
					]
				,
				footer: {
					text: "Referee: (player_name)"
				}
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "assign-ref") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully assigned referee (referee_name) to match (match_id)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "remove-ref") {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully removed referee for match (match_id)!",
				color: strip_colors["success"]
			});

			await interaction.reply({ embeds: [embed] });
		}

		if (sub === "reschedule") {
			/* const embed = new EmbedBuilder({
				title: ":white_check_mark:    Successfully rescheduled match (match_id) to <t:1757933302:F>!",
				color: strip_colors["success"],
			});

			await interaction.reply({ embeds: [embed] }); */

			const user_id = interaction.user.id;
			const existing = reschedule_times.get(user_id) || {};
			
			const day_of_week = interaction.options.getNumber("day_of_week", true);
			const hour = interaction.options.getNumber("hour", true);
			const minute = interaction.options.getNumber("minute", true);
	
			reschedule_times.set(user_id, existing);
	
			if (existing.hour && existing.minute && existing.day) {
				reschedule_times.delete(user_id);
				
				if (interaction.channel?.type === ChannelType.GuildText) {
					const thread = await interaction.channel?.threads.create({
						name: `match-${69}`,
						type: ChannelType.PrivateThread,
						autoArchiveDuration: 60,
						reason: `match-69 rescheduled by ${interaction.user.tag}`
					});
		
					const participants = [user_id, /* "174038066103713792" */];
		
					for (const userId of participants) {
						await thread.members.add(userId);
					}
	
					const embed = new EmbedBuilder({
						title: 'Reschedule Confirmation',
						description: `🕒 Proposed new time: <t:1757844858:F>. Do you agree?`,
						fields: [
							{ name: "", value: "**NOTE**: Both players and the referee must agree to the new time for it to be confirmed." }
						],
						color: strip_colors["pending"]
					});
	
					const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
						new ButtonBuilder()
							.setCustomId(`accept-${69}`)
							.setLabel('Accept')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId(`decline-${69}`)
							.setLabel('Decline')
							.setStyle(ButtonStyle.Danger)
						);
		
					await thread.send({ embeds: [embed], components: [buttons] });
				}
			}
		}
	}
};