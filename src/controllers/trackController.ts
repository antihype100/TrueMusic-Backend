import { Track, TrackAttributes } from '../models/models.js';
import { NextFunction, Request, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export class TrackController {
  async create(req: TypedRequestBody<TrackAttributes>, res: Response, next: NextFunction) {
    try {
      const track = await Track.create({ ...req.body });

      return res.json(track);
    } catch (e) {
      next(e);
    }
  }

  async getAll() {}

  async getOne() {}
}
