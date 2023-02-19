import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import {
    RouterError,
    RouterResult,
    RouterSuccess,
} from '../modules/express/RouterResult.js';
import { promises as fs } from 'fs';

export default Router()
    .get('/test', (req, res, next) => {
        next(new RouterResult(200, { test: 'test' }));
    })
    .put('/images', async (req, res, next) => {
        const image: UploadedFile = <any>req.files?.image;
        if (!image) return next(new RouterError(400, 'no image in payload'));

        await fs.writeFile('./uploads/' + image.name, image.data);

        await console.log('uploaded new image');
        next(new RouterSuccess());
    });
