import express from 'express';
import config from './config.js';
import baseRouter from './routes/index.js';
import pretty from 'express-prettify';
import fileUpload from 'express-fileupload';
import { RouterResultType } from './modules/express/RouterResult.js';

const app = express();
const serverPort = config.SERVER.HTTP_PORT;

app.use(pretty({ query: 'pretty' }));

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        debug: true,
    }),
);

//register our main router
app.use(baseRouter);

//this middleware will handle our router results..
app.use((err: RouterResultType, req, res, next) => {
    res.status(err.code).send(err);
});

//start our backend service
app.listen(serverPort, () =>
    console.log(`Started NGUpload Backend Service at http port ${serverPort}`),
);
