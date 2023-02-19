import { Router } from 'express';
import oauth2Router from './oauth2/index.js';
import userRouter from './user/index.js';
import imageRouter from './images/index.js';

export default Router()
    .use('/oauth2', oauth2Router)
    .use('/user', userRouter)
    .use('/images', imageRouter);
