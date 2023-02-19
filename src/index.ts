import express from 'express';
import config from './config.js';
import baseRouter from './routes/index.js';
import pretty from 'express-prettify';
import fileUpload from 'express-fileupload';
import {
    RouterError,
    RouterResultType,
} from './modules/express/RouterResult.js';
import morgan from 'morgan';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { Redis } from 'ioredis';
const RedisStore = connectRedis(session);

const app = express();
const serverPort = config.SERVER.HTTP_PORT;

app.use(pretty({ query: 'pretty' }));

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        debug: true,
    }),
);

//request logger
app.use(morgan('combined'));

//session management
app.use(
    session({
        store: new RedisStore({ client: new Redis() }),
        secret: '97pq3r8tgouazevfwgozg8ow87t48g7weifwg4p8gzif',
        name: 'NG_SESSION',
        resave: true,
        saveUninitialized: true,
    }),
);

//register our main router
app.use(baseRouter);

//non matching url
app.all('*', (req, res, next) => {
    next(new RouterError(404));
});

//this middleware will handle our router results..
app.use((err: RouterResultType, req, res, next) => {
    res.status(err.code).send(err);
});

//start our backend service
app.listen(serverPort, () =>
    console.log(`Started NGUpload Backend Service at http port ${serverPort}`),
);
