import { Router } from 'express';
import {
    RouterError,
    RouterSuccess,
} from '../../modules/express/RouterResult.js';
import { User } from '../../modules/User.js';

export default Router().get('', async (req, res, next) => {
    if (!req.session.user) return next(new RouterError(401));
    const user = new User(req.session.user);
    if (!user) return next(new RouterError(500));

    next(new RouterSuccess(await user.getInfo()));
});
