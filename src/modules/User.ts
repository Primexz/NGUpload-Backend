import { APIUser } from 'discord-api-types/v10';
import { SessionUser } from '../types/express-session.js';
import axios from 'axios';

export class User {
    constructor(readonly sessionUser: SessionUser) {}

    private async getRawInfo(): Promise<APIUser | null> {
        try {
            return (
                await axios.get('https://discord.com/api/v10/users/@me', {
                    headers: {
                        Authorization:
                            'Bearer ' + this.sessionUser.access_token,
                    },
                })
            ).data;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    private getAvatarUrl(user: APIUser) {
        return `http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif`;
    }

    private getCombinedName(user: APIUser) {
        return `${user.username}#${user.discriminator}`;
    }

    async getInfo() {
        const data = await this.getRawInfo();
        if (!data) return;

        return {
            discord_id: data.id,
            discord_name: data.username,
            discord_avatar_url: this.getAvatarUrl(data),
            discord_discriminator: data.discriminator,
            discord_name_combined: this.getCombinedName(data),
        };
    }
}
