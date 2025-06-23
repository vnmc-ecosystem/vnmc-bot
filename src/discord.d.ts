import "discord.js";
import { Collection } from "discord.js";

type Command = {
	data: SlashCommandBuilder
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

declare module "discord.js" {
	interface Client {
		commands: Collection<string, Command>;
	}
}