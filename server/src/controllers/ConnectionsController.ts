import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
  
  async index(req: Request, res: Response) {
    const result = await db.table('connections').count('* as total');

    const { total } = result[0];

    return res.json({ total });
  }
  
  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    await db.table('connections').insert({ user_id });

    res.status(201).send();
  }
}