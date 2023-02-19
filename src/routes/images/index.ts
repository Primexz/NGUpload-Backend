import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { promises as fs } from 'fs';
import {
    RouterError,
    RouterSuccess,
} from '../../modules/express/RouterResult.js';

export default Router().put('', async (req, res, next) => {
    const image: UploadedFile = <any>req.files?.image;
    if (!image) return next(new RouterError(400, 'no image in payload'));

    await fs.writeFile('./uploads/' + image.name, image.data);

    next(new RouterSuccess());
});
