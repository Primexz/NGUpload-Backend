import axios from 'axios';
import config from '../config.js';
import { jsonToUrlParams } from '../util.js';

interface CodeExchangeResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export class OAuth2 {
    getOAuth2Url() {
        return `https://discord.com/api/oauth2/authorize?client_id=${config.OAUTH2.CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth2%2Fcallback&response_type=code&scope=guilds.join%20identify`;
    }

    async exchangeAuthCode(code: string): Promise<CodeExchangeResponse | null> {
        let exchangeRes: CodeExchangeResponse;

        try {
            exchangeRes = (
                await axios.post(
                    `https://discord.com/api/oauth2/token`,
                    jsonToUrlParams({
                        client_id: config.OAUTH2.CLIENT_ID,
                        client_secret: config.OAUTH2.CLIENT_SECRET,
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: config.OAUTH2.REDIRECT_URL,
                    }),
                )
            ).data;
        } catch (err) {
            console.log(err);
            return;
        }

        return exchangeRes;
    }
}
