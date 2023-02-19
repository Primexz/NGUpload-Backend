import { Router } from 'express';
import {
    RouterError,
    RouterResult,
    RouterSuccess,
} from '../../modules/express/RouterResult.js';
import { OAuth2 } from '../../modules/OAuth2.js';

export default Router()
    .get('/url', (req, res, next) => {
        res.redirect(new OAuth2().getOAuth2Url());
    })
    .get('/callback', async (req, res, next) => {
        //check if we already have a user..
        if (req.session.user)
            return next(new RouterResult(400, 'already authed'));

        const oauth2Code = <string | null>req.query?.code;
        if (!oauth2Code) return next(new RouterError(400));

        const exchangeRes = await new OAuth2().exchangeAuthCode(oauth2Code);
        if (!exchangeRes)
            return next(new RouterResult(400, 'code exchange failed'));

        //save our new user details into our session
        Object.assign(req.session, {
            user: {
                access_token: exchangeRes.access_token,
                refresh_token: exchangeRes.refresh_token,
            },
        });

        next(new RouterSuccess());
    });
