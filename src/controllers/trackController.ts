import * as uuid from 'uuid';
import path from 'path';
import { TrackAttributes } from '../models/models.js';
import { NextFunction, Request, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export class TrackController {

  async create(req: TypedRequestBody<TrackAttributes>, res: Response, next: NextFunction) {
    try {
      const { id, descriptionTrack, trackName, trackPath, trackText, production } = req.body;
      return res.send(req.body);

    } catch (e) {
      console.log(e);
    }
  };

  async getAll() {

  }

  async getOne() {

  }
}
