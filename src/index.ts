import { REST, Routes, Client, Collection, Events, GatewayIntentBits, MessageFlags, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { strip_colors } from "$lib/constants";
import { create_tourney } from "$commands/create_tourney";
import { login } from "$commands/login";
import { mappool } from "$commands/mappool";
import { map } from "$commands/map";
import { standings } from "$commands/standings";
import { schedule } from "$commands/schedule";
import { match } from "$commands/match";
import { matches } from "$commands/matches";
import { player } from "$commands/player";
import { staff } from "$commands/staff";
import { stats } from "$commands/stats";
import { set_reveal_time } from "$commands/set_reveal_time";

const rest = new REST().setToken("token");
const commands = [create_tourney.data.toJSON(), login.data.toJSON(), mappool.data.toJSON(), map.data.toJSON(), schedule.data.toJSON(), standings.data.toJSON(), match.data.toJSON(), matches.data.toJSON(), player.data.toJSON(), staff.data.toJSON(), stats.data.toJSON(), set_reveal_time.data.toJSON()];

(async () => {
	try {
		console.log('📡 Registering slash commands...');
		await rest.put(
			Routes.applicationGuildCommands("my_discord_id", "other_guy_discord_id"),
			{ body: commands }
		);
		console.log('✅ Slash commands registered.');
	} catch (error) {
		console.error('❌ Error registering commands:', error);
	}
})();



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.commands.set(create_tourney.data.name, create_tourney)
client.commands.set(login.data.name, login)
client.commands.set(mappool.data.name, mappool)
client.commands.set(map.data.name, map)
client.commands.set(standings.data.name, standings)
client.commands.set(schedule.data.name, schedule)
client.commands.set(match.data.name, match)
client.commands.set(matches.data.name, matches)
client.commands.set(player.data.name, player)
client.commands.set(staff.data.name, staff)
client.commands.set(stats.data.name, stats)
client.commands.set(set_reveal_time.data.name, set_reveal_time)



client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const reschedule_times = new Map();

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);
	
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	};

	if (interaction.isStringSelectMenu()) {
		const user_id = interaction.user.id;
		const existing = reschedule_times.get(user_id) || {};
		const value = interaction.values[0];

		if (interaction.customId === 'hour_input') existing.hour = value;
		if (interaction.customId === 'minute_input') existing.minute = value;
		if (interaction.customId === 'day_input') existing.day = value;

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
					description: `🕒 Proposed new time: (new_time). Do you agree?`,
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

		await interaction.deferUpdate();
	}

	if (interaction.isButton()) {
		const [action, _] = interaction.customId.split('-');

		if (action === 'accept') await interaction.message.react('✅');
		if (action === 'decline') await interaction.message.react('❌');

		if (interaction.message.reactions.cache.get('✅')?.count === 1) {
			const embed = new EmbedBuilder({
				title: ":white_check_mark:    Match rescheduled successfully!",
				color: strip_colors["success"],
				fields: [
					{ name: "", value: "**Match ID**: (match_id)"},
					{ name: "", value: "**New Time**: <t:1757949636:F>"}
				]
			});

			await interaction.reply({ embeds: [embed] });
		}
	}
});

client.login("token");