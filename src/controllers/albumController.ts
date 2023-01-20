import { Album, AlbumAttributes } from '../models/models.js';
import { NextFunction, Request, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export class AlbumController {
  async create(req: TypedRequestBody<AlbumAttributes>, res: Response, next: NextFunction) {
    try {
      const album = await Album.create({ ...req.body });

      return res.json(album);
    } catch (e) {
      next(e);
    }
  }

  async getAll() {}

  async getOne() {}
}
