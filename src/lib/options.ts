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



export const role_option = (name = "role", description = "Staff role", required = true) =>
	(option: SlashCommandStringOption) =>
		option
		.setName(name)
		.setDescription(description)
		.setRequired(required)