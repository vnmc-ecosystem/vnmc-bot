import { SlashCommandNumberOption, SlashCommandStringOption } from "discord.js"

export const round_option = (option: SlashCommandStringOption) =>
	option
	.setName("round")
	.setDescription("Round name")
	.setRequired(true)

export const map_code_option = (option: SlashCommandStringOption) =>
	option
	.setName("map_code")
	.setDescription("Map code")
	.setRequired(true)

export const map_id_option = (type: "add" | "edit") =>
	(option: SlashCommandNumberOption) =>
		option
		.setName(type === "add" ? "map_id" : "new_map_id")
		.setDescription("Beatmap ID")
		.setMinValue(1)
		.setRequired(true)



export const event_option = (option: SlashCommandStringOption) =>
	option
	.setName("event")
	.setDescription("Event name")
	.setRequired(true)

export const match_id_option = (option: SlashCommandNumberOption) =>
	option
	.setName("match_id")
	.setDescription("Match ID on Challonge")
	.setMinValue(1)
	.setRequired(true)

export const ref_id_option = (option: SlashCommandNumberOption) =>
	option
	.setName("ref_id")
	.setDescription("Osu ID of the referee")
	.setMinValue(1)
	.setRequired(true)

export const role_option = (name = "role", description = "Staff role", required = true) =>
	(option: SlashCommandStringOption) =>
		option
		.setName(name)
		.setDescription(description)
		.setRequired(required)



export const hour_option = (option: SlashCommandNumberOption) =>
	option
	.setName("hour")
	.setDescription("Hour (0-23)")
	.setMinValue(0)
	.setMaxValue(23)
	.setRequired(true)

export const minute_option = (option: SlashCommandNumberOption) =>
	option
	.setName("minute")
	.setDescription("Minute (0-59)")
	.setMinValue(0)
	.setMaxValue(59)
	.setRequired(true)

export const day_of_week_option = (option: SlashCommandNumberOption) =>
	option
	.setName("day_of_week")
	.setDescription("Day of week (2 = Mon, 3 = Tue, ..., 8 = Sun)")
	.setMinValue(2)
	.setMaxValue(8)
	.setRequired(true)

export const day_option = (prefix?: "start" | "end") =>
	(option: SlashCommandNumberOption) =>
		option
		.setName(prefix ? `${prefix.toLowerCase()}_day` : "day")
		.setDescription(prefix ? `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} day (1-31)` : "Day of month (1-31)")
		.setMinValue(1)
		.setMaxValue(31)
		.setRequired(true)

export const month_option = (prefix?: "start" | "end") =>
	(option: SlashCommandNumberOption) =>
		option
		.setName(prefix ? `${prefix.toLowerCase()}_month` : "month")
		.setDescription(prefix ? `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} month (1-12)` : "Month (1-12)")
		.setMinValue(1)
		.setMaxValue(12)
		.setRequired(true)

export const year_option = (prefix?: "start" | "end") =>
	(option: SlashCommandNumberOption) =>
		option
		.setName(prefix ? `${prefix.toLowerCase()}_year` : "year")
		.setDescription(prefix ? `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} year` : "Year")
		.setMinValue(2025)
		.setRequired(true)



export const abbr_option = (option: SlashCommandStringOption) =>
	option
	.setName("abbr")
	.setDescription("Abbreviation of the tournament, e.g. VNMC")
	.setMaxLength(10)
	.setRequired(true)

export const top_cut_option = (option: SlashCommandNumberOption) =>
	option
	.setName("top_cut")
	.setDescription("Number of players in the bracket stage")
	.setMinValue(2)
	.setRequired(true)



export const name_option = (option: SlashCommandStringOption) =>
	option
	.setName("name")
	.setDescription("Player name")
	.setMaxLength(10)

export const sort_option = (option: SlashCommandStringOption) =>
	option
	.setName("sort")
	.setDescription("Sorting criteria")

export const limit_option = (option: SlashCommandNumberOption) =>
	option
	.setName("limit")
	.setDescription("Only display the first `X` entries")
	.setMinValue(1)