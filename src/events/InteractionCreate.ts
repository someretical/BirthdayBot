import { Events, Interaction, InteractionType } from 'discord.js';
import Event from '../structures/Event';
import BirthdayClient from '../structures/BirthdayClient';

export default class InteractionCreate extends Event {
    constructor(client: BirthdayClient) {
        super({
            client: client,
            name: Events.InteractionCreate,
            once: false
        });
    }

    async run(interaction: Interaction): Promise<void> {
        if (interaction.type !== InteractionType.ApplicationCommand) return;

        const command = this.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        }
    }
}
