import { Events, OAuth2Scopes, PermissionsBitField } from 'discord.js';
import BirthdayClient from '../structures/BirthdayClient';
import Event from '../structures/Event';
import { refreshBirthdays } from '../util/Birthday';

export default class ClientReady extends Event {
    constructor(client: BirthdayClient) {
        super({
            client: client,
            name: Events.ClientReady,
            once: true
        });
    }

    async run(): Promise<void> {
        console.log(`Logged in as ${this.client.user?.tag}`);

        console.log(
            this.client.generateInvite({
                scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot],
                permissions: PermissionsBitField.Default | PermissionsBitField.Flags.ManageRoles
            })
        );

        const interval = 15 * 60 * 1000;

        await refreshBirthdays(this.client, interval, null);
        setInterval(() => refreshBirthdays(this.client, interval, null), interval);
    }
}
